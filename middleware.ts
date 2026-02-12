import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/session';

export async function middleware(request: NextRequest) {
    const session = getSession(request);
    const { pathname } = request.nextUrl;

    // Public routes
    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // If user is logged in and trying to access login/register, redirect to dashboard
    if (session && isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If user is not logged in and trying to access protected routes, redirect to login
    if (!session && !isPublicRoute && pathname !== '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check if user is admin for admin-only routes
    if (session && pathname.startsWith('/dashboard')) {
        if (session.role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
