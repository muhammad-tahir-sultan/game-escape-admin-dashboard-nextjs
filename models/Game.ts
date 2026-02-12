import mongoose, { Schema, models } from 'mongoose';

export interface IGame {
    _id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
    duration: number; // in minutes
    price: number;
    maxPlayers: number;
    minPlayers: number;
    images: string[];
    thumbnail: string;
    isActive: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const GameSchema = new Schema<IGame>(
    {
        title: {
            type: String,
            required: [true, 'Game title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard', 'Expert'],
            required: [true, 'Difficulty is required'],
        },
        duration: {
            type: Number,
            required: [true, 'Duration is required'],
            min: [15, 'Duration must be at least 15 minutes'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        maxPlayers: {
            type: Number,
            required: [true, 'Max players is required'],
            min: [1, 'Must allow at least 1 player'],
        },
        minPlayers: {
            type: Number,
            required: [true, 'Min players is required'],
            min: [1, 'Must require at least 1 player'],
        },
        images: {
            type: [String],
            default: [],
        },
        thumbnail: {
            type: String,
            required: [true, 'Thumbnail is required'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Game = models.Game || mongoose.model<IGame>('Game', GameSchema);

export default Game;
