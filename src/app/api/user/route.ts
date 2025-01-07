import { getAuthSession } from '@/lib/auth/session';
import { connectDB } from '@/lib/db/db';
import { User } from '@/lib/models/User';
import type { ApiResponse } from '@/types/api';

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session) {
      return Response.json({ error: 'Unauthorized' } as ApiResponse<never>, {
        status: 401,
      });
    }

    await connectDB();

    const user = await User.findById(session.user.id).select('balance');

    if (!user) {
      return Response.json({ error: 'User not found' } as ApiResponse<never>, {
        status: 404,
      });
    }

    return Response.json({ data: user.balance });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return Response.json(
      {
        error: 'An error occurred while fetching user stats',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}
