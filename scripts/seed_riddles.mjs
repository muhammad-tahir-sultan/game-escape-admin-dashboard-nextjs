import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env.local') });

const GameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Expert'], required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    maxPlayers: { type: Number, required: true },
    minPlayers: { type: Number, required: true },
    images: { type: [String], default: [] },
    thumbnail: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
    place: { type: String, default: '' },
    distance: { type: String, default: '' },
    questions: { type: Array, default: [] },
}, { timestamps: true });

const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

const generateQuestions = (gameLat, gameLng) => [
    {
        name: "The Cryptic Whisper",
        intro: "You find yourself standing before the old city gates. The air feels heavy with history.",
        text: "Locate the hidden inscription near the stone lion.",
        riddle: "I have a mane but no breath, I guard the entrance until my death. What am I?",
        rightAnswer: "Stone Lion",
        questionType: "textChoices",
        options: ["Gargoyle", "Stone Lion", "Iron Sentry", "Golden Eagle"],
        index: 0,
        lat: gameLat + 0.001,
        lng: gameLng + 0.001,
        hints: ["Look for something made of stone near the gate.", "It's an animal often called the king of the jungle."]
    },
    {
        name: "The Alchemist's Shadow",
        intro: "The path leads you to a narrow alleyway where the smell of sulfur lingers.",
        text: "Analyze the symbols on the wall to find the next coordinate.",
        riddle: "I can turn lead to gold in stories of old, but here I just hold the secret you're told. What is my symbol?",
        rightAnswer: "Mercury",
        questionType: "textField",
        index: 1,
        lat: gameLat - 0.001,
        lng: gameLng + 0.002,
        hints: ["Think of the planet closest to the sun.", "It's also known as quicksilver."]
    }
];

const gamesData = [
    {
        title: "The Da Vinci Enigma",
        description: "Deconstruct the master's greatest secrets in this high-stakes intellectual heist through the Louvre's shadow.",
        difficulty: "Hard",
        duration: 90,
        price: 35.00,
        maxPlayers: 4,
        minPlayers: 2,
        thumbnail: "https://images.unsplash.com/photo-1543857182-68106299b6b2?w=800",
        isActive: true,
        tags: ["history", "puzzle", "masterpiece"],
        place: "Paris Center",
        distance: "3.5 km",
        lat: 48.8606,
        lng: 2.3376
    },
    {
        title: "Shadows over London",
        description: "A series of impossible riddles have been left across London. Step into the shoes of a detective to solve them.",
        difficulty: "Expert",
        duration: 120,
        price: 45.00,
        maxPlayers: 6,
        minPlayers: 2,
        thumbnail: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
        isActive: true,
        tags: ["detective", "london", "noir"],
        place: "Westminster",
        distance: "5.2 km",
        lat: 51.5074,
        lng: -0.1278
    },
    {
        title: "The Mayan Prophecy",
        description: "Deep in the jungle, an ancient temple holds a secret that could change the world. Decode the ruins.",
        difficulty: "Medium",
        duration: 75,
        price: 29.00,
        maxPlayers: 5,
        minPlayers: 2,
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
        isActive: true,
        tags: ["jungle", "ancient", "adventure"],
        place: "Chichen Itza",
        distance: "2.8 km",
        lat: 20.6843,
        lng: -88.5678
    },
    {
        title: "Midnight in Venice",
        description: "The canals hide secrets that only the moonlight can reveal. Navigate the waters and solve the mystery.",
        difficulty: "Easy",
        duration: 60,
        price: 25.00,
        maxPlayers: 4,
        minPlayers: 2,
        thumbnail: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800",
        isActive: true,
        tags: ["venice", "romantic", "mystery"],
        place: "Grand Canal",
        distance: "1.5 km",
        lat: 45.4408,
        lng: 12.3155
    },
    {
        title: "The Samurai's Honor",
        description: "A lost katana, a dishonored clan, and a path of riddles leading to the truth in ancient Kyoto.",
        difficulty: "Hard",
        duration: 100,
        price: 38.00,
        maxPlayers: 4,
        minPlayers: 1,
        thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
        isActive: true,
        tags: ["japan", "samurai", "honor"],
        place: "Kyoto Old Town",
        distance: "4.0 km",
        lat: 35.0116,
        lng: 135.7681
    },
    {
        title: "Escape from Alcatraz",
        description: "The most secure prison in the world. Use your wits to find the one flaw in the system.",
        difficulty: "Expert",
        duration: 110,
        price: 50.00,
        maxPlayers: 5,
        minPlayers: 2,
        thumbnail: "https://images.unsplash.com/photo-1548689816-c399f954f3dd?w=800",
        isActive: true,
        tags: ["prison", "historical", "hard"],
        place: "San Francisco Bay",
        distance: "0.5 km",
        lat: 37.8267,
        lng: -122.4230
    },
    {
        title: "The Pharaoh's Curse",
        description: "Enter the Valley of the Kings and break the curse that has lasted for millennia.",
        difficulty: "Medium",
        duration: 80,
        price: 32.00,
        maxPlayers: 6,
        minPlayers: 2,
        thumbnail: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800",
        isActive: true,
        tags: ["egypt", "curse", "pyramids"],
        place: "Luxor",
        distance: "2.2 km",
        lat: 25.7402,
        lng: 32.6014
    },
    {
        title: "The Nordic Trial",
        description: "Prove yourself to the gods. Solve the runes and survive the cold of the Viking North.",
        difficulty: "Hard",
        duration: 95,
        price: 34.00,
        maxPlayers: 4,
        minPlayers: 2,
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
        isActive: true,
        tags: ["vikings", "runes", "mythology"],
        place: "Fjords Area",
        distance: "6.0 km",
        lat: 60.3913,
        lng: 5.3221
    },
    {
        title: "The Grand Casino Heist",
        description: "The vault is opening in 60 minutes. Can your team crack the code and vanish?",
        difficulty: "Expert",
        duration: 60,
        price: 55.00,
        maxPlayers: 8,
        minPlayers: 4,
        thumbnail: "https://images.unsplash.com/photo-1596838132731-dd36a1827031?w=800",
        isActive: true,
        tags: ["heist", "vegas", "thriller"],
        place: "Las Vegas Strip",
        distance: "0.2 km",
        lat: 36.1147,
        lng: -115.1728
    },
    {
        title: "Lost in the Amazon",
        description: "Your plane went down in the world's largest rainforest. Follow the riddles to civilization.",
        difficulty: "Medium",
        duration: 85,
        price: 30.00,
        maxPlayers: 10,
        minPlayers: 2,
        thumbnail: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
        isActive: true,
        tags: ["survival", "amazon", "nature"],
        place: "Manaus Region",
        distance: "8.5 km",
        lat: -3.1190,
        lng: -60.0217
    }
];

async function seed() {
    try {
        console.log('🌱 Starting database seed for games with riddles...');

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env.local');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Optional: Keep existing games and just add new ones
        // If you want to clear, uncomment the next line:
        // await Game.deleteMany({});

        const gamesWithQuestions = gamesData.map(game => ({
            ...game,
            questions: generateQuestions(game.lat, game.lng)
        }));

        await Game.insertMany(gamesWithQuestions);
        console.log(`🎮 Created ${gamesWithQuestions.length} games with Mission Objectives (Riddles)`);

        console.log('\n✨ Seed completed successfully!');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seed();
