import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/db';
import { Budget } from '@/lib/models/Budget';
import type { IBudget } from '@/lib/models/Budget';
import type { ApiResponse } from '@/types/api';
import mongoose from 'mongoose';
import { getAuthSession } from '@/lib/auth/session';

function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

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
      return Response.json(
        { error: 'Invalid budget ID' } as ApiResponse<never>,
        { status: 400 }
      );
    }

    const budget = await Budget.findOne({
      _id: new mongoose.Types.ObjectId(params.id),
      userId: session.user.id,
    });

    if (!budget) {
      return Response.json(
        { error: 'Budget not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    const response: ApiResponse<IBudget> = {
      data: budget,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Error fetching budget:', error);
    return Response.json(
      {
        error: 'An error occurred while fetching the budget',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}

export async function PUT(
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
      return Response.json(
        { error: 'Invalid budget ID' } as ApiResponse<never>,
        { status: 400 }
      );
    }

    const body: Partial<IBudget> = await request.json();

    const budget = await Budget.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(params.id),
        userId: session.user.id,
      },
      { $set: body },
      { new: true }
    );

    if (!budget) {
      return Response.json(
        { error: 'Budget not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    const response: ApiResponse<IBudget> = {
      data: budget,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Error updating budget:', error);
    return Response.json(
      {
        error: 'An error occurred while updating the budget',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}

export async function DELETE(
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
      return Response.json(
        { error: 'Invalid budget ID' } as ApiResponse<never>,
        { status: 400 }
      );
    }

    const budget = await Budget.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(params.id),
      userId: session.user.id,
    });

    if (!budget) {
      return Response.json(
        { error: 'Budget not found' } as ApiResponse<never>,
        { status: 404 }
      );
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting budget:', error);
    return Response.json(
      {
        error: 'An error occurred while deleting the budget',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}
