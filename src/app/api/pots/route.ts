import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/db';
import { Pot } from '@/lib/models/Pot';
import type { IPot } from '@/lib/models/Pot';
import type { ApiResponse } from '@/types/api';
import { getAuthSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session) {
      return Response.json({ error: 'Unauthorized' } as ApiResponse<never>, {
        status: 401,
      });
    }

    await connectDB();

    const pots = await Pot.find({ userId: session.user.id });

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
    const session = await getAuthSession();

    if (!session) {
      return Response.json({ error: 'Unauthorized' } as ApiResponse<never>, {
        status: 401,
      });
    }

    await connectDB();
    const body: Omit<IPot, '_id' | 'createdAt' | 'updatedAt'> =
      await request.json();

    const pot = await Pot.create({ ...body, userId: session.user.id });

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
