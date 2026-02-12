import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env.local') });

// Import models
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
}, { timestamps: true });

const GameSchema = new mongoose.Schema({
    title: String,
    description: String,
    difficulty: String,
    duration: Number,
    price: Number,
    maxPlayers: Number,
    minPlayers: Number,
    images: [String],
    thumbnail: String,
    isActive: Boolean,
    tags: [String],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

async function seed() {
    try {
        console.log('🌱 Starting database seed...');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Game.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
        });
        console.log('👤 Created admin user (email: admin@example.com, password: admin123)');

        // Create sample games
        const games = [
            {
                title: 'The Mystery Mansion',
                description: 'Explore a haunted mansion and uncover its dark secrets. Can you escape before time runs out?',
                difficulty: 'Medium',
                duration: 60,
                price: 29.99,
                maxPlayers: 6,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
                images: [
                    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
                    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
                ],
                isActive: true,
                tags: ['horror', 'mystery', 'popular'],
            },
            {
                title: 'Cyber Heist',
                description: 'Break into a high-tech facility and steal the data before security catches you!',
                difficulty: 'Hard',
                duration: 75,
                price: 39.99,
                maxPlayers: 8,
                minPlayers: 3,
                thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
                images: [
                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
                ],
                isActive: true,
                tags: ['tech', 'heist', 'challenging'],
            },
            {
                title: 'Pirate\'s Treasure',
                description: 'Find the legendary pirate treasure hidden on a mysterious island!',
                difficulty: 'Easy',
                duration: 45,
                price: 24.99,
                maxPlayers: 5,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
                images: [
                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
                ],
                isActive: true,
                tags: ['adventure', 'family-friendly'],
            },
            {
                title: 'Zombie Apocalypse',
                description: 'Survive the zombie outbreak and find the cure in this intense escape room!',
                difficulty: 'Expert',
                duration: 90,
                price: 49.99,
                maxPlayers: 10,
                minPlayers: 4,
                thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800',
                images: [
                    'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800',
                ],
                isActive: true,
                tags: ['horror', 'action', 'challenging'],
            },
            {
                title: 'Ancient Egypt',
                description: 'Uncover the secrets of the pharaohs in this archaeological adventure!',
                difficulty: 'Medium',
                duration: 60,
                price: 34.99,
                maxPlayers: 6,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800',
                images: [
                    'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800',
                ],
                isActive: false,
                tags: ['history', 'puzzle'],
            },
        ];

        await Game.insertMany(games);
        console.log(`🎮 Created ${games.length} sample games`);

        console.log('\n✨ Seed completed successfully!');
        console.log('\n📝 Login credentials:');
        console.log('   Email: admin@example.com');
        console.log('   Password: admin123');

        await mongoose.disconnect();
        console.log('\n👋 Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seed();
