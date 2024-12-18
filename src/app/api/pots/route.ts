import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/db';
import { Pot } from '@/lib/models/Pot';
import type { IPot } from '@/lib/models/Pot';
import type { ApiResponse } from '@/types/api';

export async function GET() {
  try {
    await connectDB();

    const pots = await Pot.find();

    const response: ApiResponse<IPot[]> = {
      data: pots,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Error fetching pots:', error);
    return Response.json(
      { error: 'An error occurred while fetching pots' } as ApiResponse<never>,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: Omit<IPot, '_id' | 'createdAt' | 'updatedAt'> =
      await request.json();

    const pot = await Pot.create(body);

    const response: ApiResponse<IPot> = {
      data: pot,
    };

    return Response.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating pot:', error);
    return Response.json(
      { error: 'An error occurred while creating a pot' } as ApiResponse<never>,
      { status: 500 }
    );
  }
}
