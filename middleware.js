import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('jwt')?.value;

    console.log('JWT secret loaded:', JWT_SECRET.length > 0);
    console.log('Token found:', Boolean(token));

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      console.log('JWT verified payload:', payload);
    } catch (err) {
      console.error('JWT verification failed:', err);
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
