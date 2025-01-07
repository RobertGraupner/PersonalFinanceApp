import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth';

export async function getAuthSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  return session;
}
