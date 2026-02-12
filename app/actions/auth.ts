'use server';

import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/session';
import { registerSchema } from '@/lib/validations';

import passport from '@/lib/passport';

export async function loginAction(email: string, password: string) {
    try {
        const user: any = await new Promise((resolve, reject) => {
            const req = { body: { email, password } } as any;

            passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
                if (err) return reject(err);
                if (!user) return resolve(null);
                resolve(user);
            })(req, {}, () => { });
        });

        if (!user) {
            return { error: 'Invalid credentials' };
        }

        const sessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const sessionData = createSession(sessionUser);

        const isProduction = process.env.NODE_ENV === 'production';
        const cookieStore = await cookies();

        cookieStore.set('session', sessionData, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return { success: true };
    } catch (error: any) {
        console.error('Login action error:', error);
        return { error: 'Something went wrong' };
    }
}

export async function registerAction(formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}) {
    try {
        // 1. Validate input
        const validated = registerSchema.parse(formData);

        await connectDB();

        // 2. Check existing user
        const existingUser = await User.findOne({ email: validated.email });

        if (existingUser) {
            return { error: 'User already exists' };
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(validated.password, 10);

        // 4. Create user
        await User.create({
            name: validated.name,
            email: validated.email,
            password: hashedPassword,
            role: 'admin', // First user is admin
        });

        return { success: true };
    } catch (error: any) {
        console.error('Register action error:', error);

        if (error.errors) {
            return { error: error.errors[0].message };
        }

        return { error: 'Something went wrong' };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export async function getSessionUser() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return null;
        }

        const session = JSON.parse(decodeURIComponent(sessionCookie.value));
        return session.user || null;
    } catch {
        return null;
    }
}
