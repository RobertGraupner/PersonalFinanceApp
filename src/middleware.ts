import { withAuth, NextAuthMiddlewareOptions } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // actual url
    const url = req.nextUrl.pathname;
    // information from next about the login user
    const token = req.nextauth.token;

    // If the user is already logged in, redirect to the overview page
    if ((url.startsWith('/login') || url.startsWith('/register')) && token) {
      return NextResponse.redirect(new URL('/overview', req.url));
    }

    if (url === '/' && token) {
      return NextResponse.redirect(new URL('/overview', req.url));
    }
    // continue normal flow
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  } as NextAuthMiddlewareOptions
);

export const config = {
  matcher: [
    '/',
    '/transactions/:path*',
    '/budgets/:path*',
    '/pots/:path*',
    '/overview/:path*',
    '/recurring/:path*',
  ],
};
