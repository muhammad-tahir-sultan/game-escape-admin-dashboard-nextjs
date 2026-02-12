import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validated = registerSchema.parse(body);

        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email: validated.email });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validated.password, 10);

        // Create user
        const user = await User.create({
            name: validated.name,
            email: validated.email,
            password: hashedPassword,
            role: 'admin', // First user is admin
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Account created successfully',
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Registration error:', error);

        if (error.errors) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
