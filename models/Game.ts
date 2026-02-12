import mongoose, { Schema, models } from 'mongoose';

export interface IQuestion {
    name: string;
    text: string;
    riddle: string;
    intro: string;
    index: number;
    lat: number;
    lng: number;
    questionType: 'textChoices' | 'imageChoices' | 'textField';
    options: string[];
    rightAnswer: string;
    rightAnswerImage: string;
    questionHint: string;
    mapImage: string;
    images: string[];
    hints: {
        text: string;
        images: string[];
        index: number;
    }[];
    explanation: {
        text: string;
        images: string[];
        info: string;
        infoExplanation: string;
    };
}

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
    lat: number;
    lng: number;
    place: string;
    distance: string;
    questions: IQuestion[];
    createdAt: Date;
    updatedAt: Date;
}

const QuestionHintSchema = new Schema({
    text: { type: String, required: true },
    images: { type: [String], default: [] },
    index: { type: Number, required: true },
});

const AnswerExplanationSchema = new Schema({
    text: { type: String, required: true },
    images: { type: [String], default: [] },
    info: { type: String, default: '' },
    infoExplanation: { type: String, default: '' },
});

const QuestionSchema = new Schema({
    name: { type: String, required: true },
    text: { type: String, required: true },
    riddle: { type: String, required: true },
    intro: { type: String, required: true },
    index: { type: Number, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    questionType: { type: String, enum: ['textChoices', 'imageChoices', 'textField'], required: true },
    options: { type: [String], default: [] },
    rightAnswer: { type: String, required: true },
    rightAnswerImage: { type: String, default: '' },
    questionHint: { type: String, default: '' },
    mapImage: { type: String, default: '' },
    images: { type: [String], default: [] },
    hints: [QuestionHintSchema],
    explanation: AnswerExplanationSchema,
});

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
        lat: {
            type: Number,
            default: 0,
        },
        lng: {
            type: Number,
            default: 0,
        },
        place: {
            type: String,
            default: '',
        },
        distance: {
            type: String,
            default: '',
        },
        questions: {
            type: [QuestionSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Game = models.Game || mongoose.model<IGame>('Game', GameSchema);

export default Game;
