import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export const gameSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Expert']),
    duration: z.number().min(15, 'Duration must be at least 15 minutes'),
    price: z.number().min(0, 'Price cannot be negative'),
    maxPlayers: z.number().min(1, 'Must allow at least 1 player'),
    minPlayers: z.number().min(1, 'Must require at least 1 player'),
    thumbnail: z.string().url('Invalid thumbnail URL'),
    images: z.array(z.string().url()).optional(),
    isActive: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
}).refine((data) => data.minPlayers <= data.maxPlayers, {
    message: 'Min players cannot exceed max players',
    path: ['maxPlayers'],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type GameInput = z.infer<typeof gameSchema>;
