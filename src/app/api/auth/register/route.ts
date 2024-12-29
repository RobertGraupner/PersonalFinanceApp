import { NextRequest } from 'next/server';
import { registerUser } from '@/lib/auth/auth';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Register user
    const user = await registerUser(data);

    return Response.json({ data: user }, { status: 201 });
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An error occurred during registration';
    return Response.json({ error: errorMessage }, { status: 400 });
  }
}
