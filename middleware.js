import { NextResponse } from 'next/server'

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const res = NextResponse.next();

    if (token) {
        console.log(token);
        res.headers.set("x-debug-token", token); // 🪵 log it in browser devtools
    } else {
        res.headers.set("x-debug-token", "undefined");
        return NextResponse.redirect(new URL('/', request.url));
    }

    return res;
}
export const config = {
  matcher: '/admin/:path*', // matches /admin, /admin/anything, /admin/anything/more
};

