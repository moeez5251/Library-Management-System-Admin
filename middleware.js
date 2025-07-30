import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // No token — redirect immediately to home or login
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Token present — proceed
  const response = NextResponse.next();

  // Optional: set a debug header so you can see the token in the response headers
  response.headers.set('x-debug-token', token);

  return response;
}

export const config = {
  matcher: '/admin/:path*',
};
