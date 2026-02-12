import { NextRequest, NextResponse } from 'next/server';
import passport from '@/lib/passport';
import { createSession } from '@/lib/session';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Use Passport to authenticate
        const user: any = await new Promise((resolve, reject) => {
            const req = { body: { email, password } } as any;

            passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
                if (err) return reject(err);
                if (!user) return resolve(null);
                resolve(user);
            })(req, {}, () => { });
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create session
        const sessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const sessionData = createSession(sessionUser);

        const response = NextResponse.json(
            { success: true, user: sessionUser },
            { status: 200 }
        );

        // Set session cookie
        const isProduction = process.env.NODE_ENV === 'production';

        response.cookies.set('session', sessionData, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
