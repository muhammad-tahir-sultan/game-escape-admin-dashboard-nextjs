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

export const questionHintSchema = z.object({
    text: z.string().min(1, 'Hint text is required'),
    images: z.array(z.string().url()).optional().default([]),
    index: z.number().int(),
});

export const answerExplanationSchema = z.object({
    text: z.string().min(1, 'Explanation text is required'),
    images: z.array(z.string().url()).optional().default([]),
    info: z.string().optional().default(''),
    infoExplanation: z.string().optional().default(''),
});

export const questionSchema = z.object({
    name: z.string().min(1, 'Question name is required'),
    text: z.string().min(1, 'Question text is required'),
    riddle: z.string().min(1, 'Riddle text is required'),
    intro: z.string().min(1, 'Intro text is required'),
    index: z.number().int(),
    lat: z.number(),
    lng: z.number(),
    questionType: z.enum(['textChoices', 'imageChoices', 'textField']),
    options: z.array(z.string()).optional().default([]),
    rightAnswer: z.string().min(1, 'Right answer is required'),
    rightAnswerImage: z.string().url().optional().or(z.literal('')).default(''),
    questionHint: z.string().optional().default(''),
    mapImage: z.string().url().optional().or(z.literal('')).default(''),
    images: z.array(z.string().url()).optional().default([]),
    hints: z.array(questionHintSchema).optional().default([]),
    explanation: answerExplanationSchema.optional(),
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
    images: z.array(z.string().url()).optional().default([]),
    isActive: z.boolean().optional().default(true),
    tags: z.array(z.string()).optional().default([]),
    // New Flutter-compatible fields
    lat: z.number().optional().default(0),
    lng: z.number().optional().default(0),
    place: z.string().min(1, 'Place is required'),
    distance: z.string().min(1, 'Distance (e.g. 2.5 km) is required'),
    questions: z.array(questionSchema).optional().default([]),
}).refine((data) => data.minPlayers <= data.maxPlayers, {
    message: 'Min players cannot exceed max players',
    path: ['maxPlayers'],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type GameInput = z.infer<typeof gameSchema>;
export type QuestionInput = z.infer<typeof questionSchema>;
export type HintInput = z.infer<typeof questionHintSchema>;
export type ExplanationInput = z.infer<typeof answerExplanationSchema>;
