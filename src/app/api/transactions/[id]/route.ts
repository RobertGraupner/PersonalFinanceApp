import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/db';
import { Transaction } from '@/lib/models/Transaction';
import type { ITransaction } from '@/lib/models/Transaction';
import type { ApiResponse } from '@/types/api';
import mongoose from 'mongoose';

// helper function to check if the id is valid
function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

// Get single transaction
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!isValidId(params.id)) {
      return Response.json(
        { error: 'Invalid transaction ID' } as ApiResponse<never>,
        { status: 400 }
      );
    }

    // We have to use new mongoose.Types.ObjectId(params.id) to convert the id to a valid mongoose object id
    const transaction = await Transaction.findById(new mongoose.Types.ObjectId(params.id));

    if (!transaction) {
      return Response.json(
        { error: 'Transaction not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    const response: ApiResponse<ITransaction> = {
      data: transaction
    };

    return Response.json(response);
  } catch (error) {
    console.error('Error fetching transaction:', error);

    const errorResponse: ApiResponse<never> = {
      error: 'An error occurred while fetching the transaction'
    };

    return Response.json(errorResponse, { status: 500 });
  }
}

// Update transaction
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!isValidId(params.id)) {
      return Response.json(
        { error: 'Invalid transaction ID' } as ApiResponse<never>,
        { status: 400 }
      );
    }

    const body: Partial<ITransaction> = await request.json();

    const transaction = await Transaction.findByIdAndUpdate(
      new mongoose.Types.ObjectId(params.id),
      { $set: body },
      { new: true }
    );

    if (!transaction) {
      return Response.json(
        { error: 'Transaction not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    const response: ApiResponse<ITransaction> = {
      data: transaction
    };

    return Response.json(response);
  } catch (error) {
    console.error('Error updating transaction:', error);

    const errorResponse: ApiResponse<never> = {
      error: 'An error occurred while updating the transaction'
    };

    return Response.json(errorResponse, { status: 500 });
  }
}

// Delete transaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!isValidId(params.id)) {
      return Response.json(
        { error: 'Invalid transaction ID' } as ApiResponse<never>,
        { status: 400 }
      );
    }

    const transaction = await Transaction.findByIdAndDelete(new mongoose.Types.ObjectId(params.id));

    if (!transaction) {
      return Response.json(
        { error: 'Transaction not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting transaction:', error);

    const errorResponse: ApiResponse<never> = {
      error: 'An error occurred while deleting the transaction'
    };

    return Response.json(errorResponse, { status: 500 });
  }
}