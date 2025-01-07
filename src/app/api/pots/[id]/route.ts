import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/db';
import { Pot } from '@/lib/models/Pot';
import { User } from '@/lib/models/User';
import type { ApiResponse, MoneyOperation } from '@/types/api';
import type { IPot } from '@/lib/models/Pot';
import mongoose from 'mongoose';
import { getAuthSession } from '@/lib/auth/session';

function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

// Get single pot
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return Response.json({ error: 'Unauthorized' } as ApiResponse<never>, {
        status: 401,
      });
    }

    await connectDB();

    if (!isValidId(params.id)) {
      return Response.json({ error: 'Invalid pot ID' } as ApiResponse<never>, {
        status: 400,
      });
    }

    const pot = await Pot.findOne({
      _id: new mongoose.Types.ObjectId(params.id),
      userId: session.user.id,
    });

    if (!pot) {
      return Response.json({ error: 'Pot not found' } as ApiResponse<never>, {
        status: 404,
      });
    }

    return Response.json({ data: pot } as ApiResponse<IPot>);
  } catch (error) {
    console.error('Error fetching the pot:', error);
    return Response.json(
      { error: 'An error occurred while fetching the pot' },
      { status: 500 }
    );
  }
}

// Update pot or add/withdraw funds
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;
  try {
    const userSession = await getAuthSession();

    if (!userSession) {
      return Response.json({ error: 'Unauthorized' } as ApiResponse<never>, {
        status: 401,
      });
    }

    await connectDB();
    // Use session to ensure atomicity of the operation. It's not needed for this operation, but it's a good practice to use it
    session = await mongoose.startSession();
    session.startTransaction();

    if (!isValidId(params.id)) {
      return Response.json({ error: 'Invalid pot ID' } as ApiResponse<never>, {
        status: 400,
      });
    }

    const body = await request.json();

    // Check if the operation and amount are provided
    if (body.operation && body.amount) {
      const { amount, operation } = body as MoneyOperation;

      if (amount <= 0) {
        await session.abortTransaction();
        return Response.json(
          { error: 'Amount must be greater than 0' } as ApiResponse<never>,
          { status: 400 }
        );
      }

      const pot = await Pot.findOne({
        _id: new mongoose.Types.ObjectId(params.id),
        userId: userSession.user.id,
      }).session(session);

      if (!pot) {
        await session.abortTransaction();
        return Response.json({ error: 'Pot not found' } as ApiResponse<never>, {
          status: 404,
        });
      }

      const user = await User.findById(userSession.user.id).session(session);
      if (!user) {
        await session.abortTransaction();
        return Response.json(
          { error: 'User not found' } as ApiResponse<never>,
          { status: 404 }
        );
      }

      if (operation === 'add') {
        // Check if user has enough funds
        if (user.balance.current < amount) {
          await session.abortTransaction();
          return Response.json(
            {
              error: 'Insufficient funds in user balance',
            } as ApiResponse<never>,
            { status: 400 }
          );
        }

        // Withdraw funds from user's balance
        await User.findByIdAndUpdate(
          userSession.user.id,
          { $inc: { 'balance.current': -amount } },
          { session }
        );

        // Add funds to pot
        await Pot.findOneAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(params.id),
            userId: userSession.user.id,
          },
          { $inc: { total: amount } },
          { session }
        );
      } else if (operation === 'withdraw') {
        // Check if pot has enough funds
        if (pot.total < amount) {
          await session.abortTransaction();
          return Response.json(
            { error: 'Insufficient funds in pot' } as ApiResponse<never>,
            { status: 400 }
          );
        }

        // Add funds to user's balance
        await User.findByIdAndUpdate(
          userSession.user.id,
          { $inc: { 'balance.current': amount } },
          { session }
        );

        // Withdraw funds from pot
        await Pot.findByIdAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(params.id),
            userId: userSession.user.id,
          },
          { $inc: { total: -amount } },
          { session }
        );
      }

      await session.commitTransaction();
    } else {
      // Regular pot update
      const updatedPot = await Pot.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(params.id),
          userId: userSession.user.id,
        },
        body,
        { new: true }
      );
      if (!updatedPot) {
        return Response.json({ error: 'Pot not found' } as ApiResponse<never>, {
          status: 404,
        });
      }
      return Response.json({ data: updatedPot } as ApiResponse<IPot>);
    }

    const updatedPot = await Pot.findOne({
      _id: new mongoose.Types.ObjectId(params.id),
      userId: userSession.user.id,
    });

    return Response.json({ data: updatedPot } as ApiResponse<IPot>);
  } catch (error) {
    console.error('Error updating pot:', error);
    return Response.json(
      {
        error: 'An error occurred while updating the pot',
      } as ApiResponse<never>,
      { status: 500 }
    );
  } finally {
    await session?.endSession();
  }
}

// Delete pot
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;
  try {
    const userSession = await getAuthSession();

    if (!userSession) {
      return Response.json({ error: 'Unauthorized' } as ApiResponse<never>, {
        status: 401,
      });
    }

    await connectDB();

    session = await mongoose.startSession();
    session.startTransaction();

    if (!isValidId(params.id)) {
      return Response.json({ error: 'Invalid pot ID' } as ApiResponse<never>, {
        status: 400,
      });
    }

    const pot = await Pot.findOne({
      _id: new mongoose.Types.ObjectId(params.id),
      userId: userSession.user.id,
    }).session(session);

    if (!pot) {
      await session.abortTransaction();
      return Response.json({ error: 'Pot not found' } as ApiResponse<never>, {
        status: 404,
      });
    }

    // Return funds to user's balance
    await User.findByIdAndUpdate(
      userSession.user.id,
      { $inc: { 'balance.current': pot.total } },
      { session }
    );

    await pot.deleteOne({ session });
    await session.commitTransaction();

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting pot:', error);
    return Response.json(
      {
        error: 'An error occurred while deleting the pot',
      } as ApiResponse<never>,
      { status: 500 }
    );
  } finally {
    await session?.endSession();
  }
}
