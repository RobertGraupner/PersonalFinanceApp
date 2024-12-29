import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const url = req.nextUrl.pathname;
      if (url.startsWith('/login') || url.startsWith('/register')) {
        return true;
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: [
    '/transactions/:path*',
    '/budgets/:path*',
    '/pots/:path*',
    '/overview/:path*',
  ],
};
