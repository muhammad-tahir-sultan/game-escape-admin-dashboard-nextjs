'use server';

import connectDB from '@/lib/mongodb';
import Game from '@/models/Game';
import { gameSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';


function extractGameData(formData: FormData) {
    return {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        difficulty: formData.get('difficulty') as any,
        duration: Number(formData.get('duration')) || 0,
        price: Number(formData.get('price')) || 0,
        maxPlayers: Number(formData.get('maxPlayers')) || 0,
        minPlayers: Number(formData.get('minPlayers')) || 0,
        thumbnail: formData.get('thumbnail') as string,
        images: parseArrayInput(formData.get('images') as string),
        isActive: formData.get('isActive') === 'true',
        tags: parseArrayInput(formData.get('tags') as string),
        lat: Number(formData.get('lat')) || 0,
        lng: Number(formData.get('lng')) || 0,
        place: formData.get('place') as string,
        distance: formData.get('distance') as string,
        questions: parseQuestions(formData.get('questions') as string),
    };
}


function formatResponse(doc: any) {
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
}

function parseArrayInput(input: string | null | undefined): string[] {
    if (!input) return [];
    try {
        const parsed = JSON.parse(input);
        return Array.isArray(parsed) ? parsed.map((item: any) => String(item)) : [];
    } catch {
        return input.split(',').map(s => s.trim()).filter(Boolean);
    }
}

function parseQuestions(input: string | null | undefined): any[] {
    if (!input) return [];
    try {
        const parsed = JSON.parse(input);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}


export async function getGames(search?: string, difficulty?: string, page: number = 1, limit: number = 6) {
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

        const skip = (page - 1) * limit;
        const total = await Game.countDocuments(query);
        const games = await Game.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        return {
            success: true,
            games: formatResponse(games),
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
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
        if (!game) return { error: 'Game not found' };
        return { success: true, game: formatResponse(game) };
    } catch (error: any) {
        console.error('getGameById error:', error);
        return { error: error.message || 'Failed to fetch game' };
    }
}

export async function createGame(formData: FormData) {
    try {
        const data = extractGameData(formData);
        const validated = gameSchema.safeParse(data);

        if (!validated.success) {
            return { error: validated.error.issues[0].message };
        }

        await connectDB();
        const game = await Game.create(validated.data);
        revalidatePath('/dashboard/games');

        return { success: true, game: formatResponse(game) };
    } catch (error: any) {
        console.error('createGame error:', error);
        return { error: error.message || 'Failed to create game' };
    }
}

export async function updateGame(id: string, formData: FormData) {
    try {
        const data = extractGameData(formData);
        const validated = gameSchema.safeParse(data);

        if (!validated.success) {
            return { error: validated.error.issues[0].message };
        }

        await connectDB();
        const game = await Game.findByIdAndUpdate(id, validated.data, {
            new: true,
            runValidators: true
        });

        if (!game) return { error: 'Game not found' };
        revalidatePath('/dashboard/games');

        return { success: true, game: formatResponse(game) };
    } catch (error: any) {
        console.error('updateGame error:', error);
        return { error: error.message || 'Failed to update game' };
    }
}

export async function deleteGame(id: string) {
    try {
        await connectDB();
        const game = await Game.findByIdAndDelete(id);
        if (!game) return { error: 'Game not found' };
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
        if (!game) return { error: 'Game not found' };

        game.isActive = !game.isActive;
        await game.save();
        revalidatePath('/dashboard/games');

        return { success: true, game: formatResponse(game) };
    } catch (error: any) {
        return { error: error.message || 'Failed to toggle status' };
    }
}

