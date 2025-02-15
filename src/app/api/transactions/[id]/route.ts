import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/db';
import { Transaction } from '@/lib/models/Transaction';
import type { ITransaction } from '@/lib/models/Transaction';
import type { ApiResponse } from '@/types/api';
import mongoose from 'mongoose';
import { getAuthSession } from '@/lib/auth/session';
import { User } from '@/lib/models/User';
import { INCOME_CATEGORIES } from '@/constants/transactions';

import type { IUser } from '@/lib/models/User';
// helper function to check if the id is valid
function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

function updateUserBalance(
  user: IUser,
  oldAmount: number,
  newAmount: number
): void {
  // Reverse the effect of the old transaction
  if (oldAmount > 0) {
    user.balance.income -= oldAmount;
  } else {
    user.balance.expenses -= Math.abs(oldAmount);
  }
  // Add the new transaction
  if (newAmount > 0) {
    user.balance.income += newAmount;
  } else {
    user.balance.expenses += Math.abs(newAmount);
  }
  user.balance.current += newAmount - oldAmount;
}

// Get single transaction
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
        { error: 'Invalid transaction ID' } as ApiResponse<never>,
        { status: 400 }
      );
    }

    // We have to use new mongoose.Types.ObjectId(id) to convert the id to a valid mongoose object id
    const transaction = await Transaction.findOne({
      _id: new mongoose.Types.ObjectId(id),
      userId: session.user.id,
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    const response: ApiResponse<ITransaction> = {
      data: transaction,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching transaction:', error);

    const errorResponse: ApiResponse<never> = {
      error: 'An error occurred while fetching the transaction',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Update transaction
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
        { status: 401 }
      );
    }

    await connectDB();

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid transaction ID' } as ApiResponse<never>,
        { status: 400 }
      );
    }

    mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    // Get the original transaction
    const originalTransaction = await Transaction.findOne({
      _id: new mongoose.Types.ObjectId(id),
      userId: userSession.user.id,
    }).session(mongoSession);

    if (!originalTransaction) {
      await mongoSession.abortTransaction();
      return NextResponse.json(
        { error: 'Transaction not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    const body: Partial<ITransaction> = await request.json();

    // Determine the new amount: if the category belongs to income,
    // the amount must be positive, otherwise negative.
    const parsedAmount = parseFloat(
      body.amount?.toString().replace(',', '.') || ''
    );

    if (isNaN(parsedAmount)) {
      await mongoSession.abortTransaction();
      return NextResponse.json(
        { error: 'Invalid amount format' } as ApiResponse<never>,
        { status: 400 }
      );
    }
    const newAmount = INCOME_CATEGORIES.includes(body.category as string)
      ? Math.abs(parsedAmount)
      : -Math.abs(parsedAmount);
    const oldAmount = originalTransaction.amount;

    // Update the transaction fields
    Object.assign(originalTransaction, {
      name: body.name ?? originalTransaction.name,
      category: body.category ?? originalTransaction.category,
      amount: newAmount,
      recurring: body.recurring ?? originalTransaction.recurring,
      date: body.date ? new Date(body.date) : originalTransaction.date,
      avatar: body.avatar ?? body.category ?? originalTransaction.category,
    });

    // Reverse the effect of the old transaction and add the new one
    const user = await User.findById(userSession.user.id).session(mongoSession);
    if (!user) {
      await mongoSession.abortTransaction();
      return NextResponse.json(
        { error: 'User not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    updateUserBalance(user, oldAmount, newAmount);

    await originalTransaction.save({ session: mongoSession });
    await user.save({ session: mongoSession });
    await mongoSession.commitTransaction();

    const response: ApiResponse<ITransaction> = {
      data: originalTransaction,
    };

    return NextResponse.json(response);
  } catch (error) {
    await mongoSession?.abortTransaction();
    console.error('Error updating transaction:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while updating the transaction',
      } as ApiResponse<never>,
      { status: 500 }
    );
  } finally {
    await mongoSession?.endSession();
  }
}

// Delete transaction
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
        { status: 401 }
      );
    }

    await connectDB();

    mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    const transaction = await Transaction.findOne({
      _id: new mongoose.Types.ObjectId(id),
      userId: userSession.user.id,
    }).session(mongoSession);

    if (!transaction) {
      await mongoSession.abortTransaction();
      return NextResponse.json(
        { error: 'Transaction not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    const user = await User.findById(userSession.user.id).session(mongoSession);
    if (!user) {
      await mongoSession.abortTransaction();
      return NextResponse.json(
        { error: 'User not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    updateUserBalance(user, transaction.amount, 0);

    await user.save({ session: mongoSession });
    await transaction.deleteOne({ session: mongoSession });
    await mongoSession.commitTransaction();

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    await mongoSession?.abortTransaction();
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while deleting the transaction',
      } as ApiResponse<never>,
      { status: 500 }
    );
  } finally {
    await mongoSession?.endSession();
  }
}
