import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' } as ApiResponse<never>,
        {
          status: 401,
        }
      );
    }

    await connectDB();

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid pot ID' } as ApiResponse<never>,
        {
          status: 400,
        }
      );
    }

    const pot = await Pot.findOne({
      _id: new mongoose.Types.ObjectId(id),
      userId: session.user.id,
    });

    if (!pot) {
      return NextResponse.json(
        { error: 'Pot not found' } as ApiResponse<never>,
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ data: pot } as ApiResponse<IPot>);
  } catch (error) {
    console.error('Error fetching the pot:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the pot' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  let mongoSession;

  try {
    const userSession = await getAuthSession();

    if (!userSession) {
      return NextResponse.json(
        { error: 'Unauthorized' } as ApiResponse<never>,
        {
          status: 401,
        }
      );
    }

    await connectDB();

    mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    if (!isValidId(id)) {
      await mongoSession.abortTransaction();
      return NextResponse.json(
        { error: 'Invalid pot ID' } as ApiResponse<never>,
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    if (body.operation && body.amount) {
      const { amount, operation } = body as MoneyOperation;

      if (amount <= 0) {
        await mongoSession.abortTransaction();
        return NextResponse.json(
          { error: 'Amount must be greater than 0' } as ApiResponse<never>,
          { status: 400 }
        );
      }

      const pot = await Pot.findOne({
        _id: new mongoose.Types.ObjectId(id),
        userId: userSession.user.id,
      }).session(mongoSession);

      if (!pot) {
        await mongoSession.abortTransaction();
        return NextResponse.json(
          { error: 'Pot not found' } as ApiResponse<never>,
          {
            status: 404,
          }
        );
      }

      const user = await User.findById(userSession.user.id).session(
        mongoSession
      );
      if (!user) {
        await mongoSession.abortTransaction();
        return NextResponse.json(
          { error: 'User not found' } as ApiResponse<never>,
          { status: 404 }
        );
      }

      if (operation === 'addMoney') {
        // Check if the user has enough funds
        if (user.balance.current < amount) {
          await mongoSession.abortTransaction();
          return NextResponse.json(
            {
              error: 'Insufficient funds in user balance',
            } as ApiResponse<never>,
            { status: 400 }
          );
        }

        // Withdraw the funds from the user's balance
        await User.findByIdAndUpdate(
          userSession.user.id,
          { $inc: { 'balance.current': -amount } },
          { session: mongoSession }
        );

        // Add the funds to the pot
        await Pot.findOneAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(id),
            userId: userSession.user.id,
          },
          { $inc: { total: amount } },
          { session: mongoSession }
        );
      } else if (operation === 'withdraw') {
        // Check if the pot has enough funds
        if (pot.total < amount) {
          await mongoSession.abortTransaction();
          return NextResponse.json(
            { error: 'Insufficient funds in pot' } as ApiResponse<never>,
            { status: 400 }
          );
        }

        // Withdraw the funds from the pot
        await User.findByIdAndUpdate(
          userSession.user.id,
          { $inc: { 'balance.current': amount } },
          { session: mongoSession }
        );

        // Update the pot total
        await Pot.findByIdAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(id),
            userId: userSession.user.id,
          },
          { $inc: { total: -amount } },
          { session: mongoSession }
        );
      }

      await mongoSession.commitTransaction();
    } else {
      const updatedPot = await Pot.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
          userId: userSession.user.id,
        },
        body,
        { new: true }
      );
      if (!updatedPot) {
        await mongoSession.abortTransaction();
        return NextResponse.json(
          { error: 'Pot not found' } as ApiResponse<never>,
          {
            status: 404,
          }
        );
      }
      await mongoSession.commitTransaction();
      return NextResponse.json({ data: updatedPot } as ApiResponse<IPot>);
    }

    const updatedPot = await Pot.findOne({
      _id: new mongoose.Types.ObjectId(id),
      userId: userSession.user.id,
    });

    return NextResponse.json({ data: updatedPot } as ApiResponse<IPot>);
  } catch (error) {
    console.error('Error updating pot:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while updating the pot',
      } as ApiResponse<never>,
      { status: 500 }
    );
  } finally {
    await mongoSession?.endSession();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  let mongoSession;

  try {
    const userSession = await getAuthSession();

    if (!userSession) {
      return NextResponse.json(
        { error: 'Unauthorized' } as ApiResponse<never>,
        {
          status: 401,
        }
      );
    }

    await connectDB();

    mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    if (!isValidId(id)) {
      await mongoSession.abortTransaction();
      return NextResponse.json(
        { error: 'Invalid pot ID' } as ApiResponse<never>,
        {
          status: 400,
        }
      );
    }

    const pot = await Pot.findOne({
      _id: new mongoose.Types.ObjectId(id),
      userId: userSession.user.id,
    }).session(mongoSession);

    if (!pot) {
      await mongoSession.abortTransaction();
      return NextResponse.json(
        { error: 'Pot not found' } as ApiResponse<never>,
        {
          status: 404,
        }
      );
    }

    // Return the funds to the user's balance
    await User.findByIdAndUpdate(
      userSession.user.id,
      { $inc: { 'balance.current': pot.total } },
      { session: mongoSession }
    );

    await pot.deleteOne({ session: mongoSession });
    await mongoSession.commitTransaction();

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting pot:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while deleting the pot',
      } as ApiResponse<never>,
      { status: 500 }
    );
  } finally {
    await mongoSession?.endSession();
  }
}
