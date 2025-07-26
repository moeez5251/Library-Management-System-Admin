import { NextResponse } from 'next/server'

export async function middleware(request) {
    const token = request.cookies.getAll()
    console.log('Auth Token:', token)
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/admin/:path*',
}