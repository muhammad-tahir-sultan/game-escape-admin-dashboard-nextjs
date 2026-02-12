'use server';

import connectDB from '@/lib/mongodb';
import Game from '@/models/Game';
import { gameSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

// Helper to reliably parse array inputs (JSON or comma-separated)
function parseArrayInput(input: string | null | undefined): string[] {
    if (!input) return [];
    try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed)) return parsed.map((item: any) => String(item));
        return [];
    } catch {
        // Fallback: split by comma if not valid JSON
        return input.split(',').map(s => s.trim()).filter(Boolean);
    }
}

export async function getGames(search?: string, difficulty?: string) {
    try {
        await connectDB();

        const query: any = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (difficulty && difficulty !== 'all') {
            query.difficulty = difficulty;
        }

        const games = await Game.find(query).sort({ createdAt: -1 }).lean();

        return {
            success: true,
            games: JSON.parse(JSON.stringify(games))
        };
    } catch (error: any) {
        console.error('getGames error:', error);
        return { error: error.message || 'Failed to fetch games' };
    }
}

export async function getGameById(id: string) {
    try {
        await connectDB();
        const game = await Game.findById(id).lean();

        if (!game) {
            return { error: 'Game not found' };
        }

        return {
            success: true,
            game: JSON.parse(JSON.stringify(game))
        };
    } catch (error: any) {
        console.error('getGameById error:', error);
        return { error: error.message || 'Failed to fetch game' };
    }
}

export async function createGame(formData: FormData) {
    try {
        // Robust parsing of inputs
        const rawImages = formData.get('images') as string;
        const rawTags = formData.get('tags') as string;

        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            difficulty: formData.get('difficulty') as any,
            duration: Number(formData.get('duration')),
            price: Number(formData.get('price')),
            maxPlayers: Number(formData.get('maxPlayers')),
            minPlayers: Number(formData.get('minPlayers')),
            thumbnail: formData.get('thumbnail') as string,
            images: parseArrayInput(rawImages),
            isActive: formData.get('isActive') === 'true',
            tags: parseArrayInput(rawTags),
        };

        const validatedResult = gameSchema.safeParse(data);

        if (!validatedResult.success) {
            return { error: validatedResult.error.issues[0].message };
        }

        const validated = validatedResult.data;

        await connectDB();
        const game = await Game.create(validated);

        revalidatePath('/dashboard/games');

        return {
            success: true,
            game: JSON.parse(JSON.stringify(game))
        };
    } catch (error: any) {
        console.error('createGame error:', error);
        return { error: error.message || 'Failed to create game' };
    }
}

export async function updateGame(id: string, formData: FormData) {
    try {
        const rawImages = formData.get('images') as string;
        const rawTags = formData.get('tags') as string;

        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            difficulty: formData.get('difficulty') as any,
            duration: Number(formData.get('duration')),
            price: Number(formData.get('price')),
            maxPlayers: Number(formData.get('maxPlayers')),
            minPlayers: Number(formData.get('minPlayers')),
            thumbnail: formData.get('thumbnail') as string,
            images: parseArrayInput(rawImages),
            isActive: formData.get('isActive') === 'true',
            tags: parseArrayInput(rawTags),
        };

        const validatedResult = gameSchema.safeParse(data);

        if (!validatedResult.success) {
            return { error: validatedResult.error.issues[0].message };
        }

        const validated = validatedResult.data;

        await connectDB();
        const game = await Game.findByIdAndUpdate(id, validated, {
            new: true,
            runValidators: true
        });

        if (!game) {
            return { error: 'Game not found' };
        }

        revalidatePath('/dashboard/games');

        return {
            success: true,
            game: JSON.parse(JSON.stringify(game))
        };
    } catch (error: any) {
        console.error('updateGame error:', error);
        return { error: error.message || 'Failed to update game' };
    }
}

export async function deleteGame(id: string) {
    try {
        await connectDB();
        const game = await Game.findByIdAndDelete(id);

        if (!game) {
            return { error: 'Game not found' };
        }

        revalidatePath('/dashboard/games');

        return { success: true };
    } catch (error: any) {
        console.error('deleteGame error:', error);
        return { error: error.message || 'Failed to delete game' };
    }
}

export async function toggleGameStatus(id: string) {
    try {
        await connectDB();
        const game = await Game.findById(id);

        if (!game) {
            return { error: 'Game not found' };
        }

        game.isActive = !game.isActive;
        await game.save();

        revalidatePath('/dashboard/games');

        return {
            success: true,
            game: JSON.parse(JSON.stringify(game))
        };
    } catch (error: any) {
        return { error: error.message || 'Failed to toggle game status' };
    }
}
