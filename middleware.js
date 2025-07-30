import { NextResponse } from 'next/server'

export async function middleware(request) {
    const cookieStore = await  request.cookies.getAll()
    console.log(cookieStore);
}