import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/db/db';
import { User } from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { AUTH_CONSTANTS, AUTH_ERROR_MESSAGES } from '@/constants/auth';

const loginAttempts = new Map<string, number>();

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    await connectDB();

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error(AUTH_ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      ...data,
      password: hashedPassword,
      balance: {
        current: 0,
        income: 0,
        expenses: 0,
      },
    });

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: AUTH_CONSTANTS.SESSION_MAX_AGE,
  },
  providers: [
    // Built-in provider to login in next-auth. We have to define how to login
    CredentialsProvider({
      name: 'Credentials',
      // Define what is required to login
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      // Built-in function to check if login data is valid
      async authorize(credentials) {
        if (!credentials) {
          throw new Error(AUTH_ERROR_MESSAGES.NO_LOGIN_DATA);
        }

        const email = credentials.email;

        // Check if the account is not locked
        const lastAttemptTime = loginAttempts.get(`${email}_lockTime`);
        if (
          lastAttemptTime &&
          Date.now() - lastAttemptTime < AUTH_CONSTANTS.LOGIN_LOCK_TIME
        ) {
          throw new Error(AUTH_ERROR_MESSAGES.ACCOUNT_LOCKED);
        }

        const attempts = loginAttempts.get(email) || 0;

        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            // Increase the counter for non-existent accounts
            loginAttempts.set(email, attempts + 1);
            throw new Error(AUTH_ERROR_MESSAGES.USER_NOT_FOUND);
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            // Increase the counter for failed attempts
            loginAttempts.set(email, attempts + 1);

            if (attempts + 1 >= AUTH_CONSTANTS.LOGIN_MAX_ATTEMPTS) {
              loginAttempts.set(`${email}_lockTime`, Date.now());
              throw new Error(AUTH_ERROR_MESSAGES.TOO_MANY_ATTEMPTS);
            }

            throw new Error(AUTH_ERROR_MESSAGES.INVALID_PASSWORD);
          }

          // Successful login - reset the counters
          loginAttempts.delete(email);
          loginAttempts.delete(`${email}_lockTime`);

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.log('Auth error:', error);
          throw error;
        }
      },
    }),
  ],
  // Custom callbacks to add user id to session and token
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
