import { NextRequest, NextResponse } from 'next/server';

export interface SessionUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

// Simple session store using cookies
export function getSession(request: NextRequest): SessionUser | null {
    const sessionCookie = request.cookies.get('session');

    if (!sessionCookie) {
        return null;
    }

    try {
        const session = JSON.parse(decodeURIComponent(sessionCookie.value));
        return session.user || null;
    } catch {
        return null;
    }
}

export function createSession(user: SessionUser): string {
    const session = {
        user,
        createdAt: Date.now(),
    };

    return encodeURIComponent(JSON.stringify(session));
}

export function clearSession(): string {
    return '';
}
