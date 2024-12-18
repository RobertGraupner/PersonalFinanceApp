import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/db';
import { Budget } from '@/lib/models/Budget';
import type { IBudget } from '@/lib/models/Budget';
import type { ApiResponse } from '@/types/api';

export async function GET() {
  try {
    await connectDB();

    const budgets = await Budget.find();

    const response: ApiResponse<IBudget[]> = {
      data: budgets,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return Response.json(
      {
        error: 'An error occurred while fetching budgets',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: Omit<IBudget, '_id' | 'createdAt' | 'updatedAt'> =
      await request.json();

    const budget = await Budget.create(body);

    const response: ApiResponse<IBudget> = {
      data: budget,
    };

    return Response.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating budget:', error);
    return Response.json(
      {
        error: 'An error occurred while creating a budget',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}
