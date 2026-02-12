import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env.local') });

// Updated Schema to match the real model more closely
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

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

async function seed() {
    try {
        console.log('🌱 Starting database seed...');

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env.local');
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing games only, we might want to keep users
        await Game.deleteMany({});
        console.log('🗑️  Cleared existing games');

        // Check if admin exists, if not create one
        const adminEmail = 'admin@example.com';
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            });
            console.log('👤 Created admin user (email: admin@example.com, password: admin123)');
        } else {
            console.log('👤 Admin user already exists');
        }

        // Create 15 sample games
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
                images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800'],
                isActive: true,
                tags: ['horror', 'mystery', 'popular'],
                place: 'Old Town Square',
                distance: '1.2 km',
                lat: 48.2082,
                lng: 16.3738,
            },
            {
                title: 'Cyber Heist 2077',
                description: 'Break into a high-tech facility and steal the neuro-data before security catches you!',
                difficulty: 'Hard',
                duration: 75,
                price: 39.99,
                maxPlayers: 8,
                minPlayers: 3,
                thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
                images: ['https://images.unsplash.com/photo-1550741166-3d8c1a262c50?w=800'],
                isActive: true,
                tags: ['tech', 'heist', 'challenging'],
                place: 'Innovation Quarter',
                distance: '2.5 km',
                lat: 48.2100,
                lng: 16.3634,
            },
            {
                title: 'Pirate\'s Lost Treasure',
                description: 'Find the legendary pirate treasure hidden on a mysterious island! Perfect for beginners.',
                difficulty: 'Easy',
                duration: 45,
                price: 24.99,
                maxPlayers: 5,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
                images: ['https://images.unsplash.com/photo-1493084325785-305b0780287a?w=800'],
                isActive: true,
                tags: ['adventure', 'family-friendly'],
                place: 'Harbor Gate',
                distance: '0.8 km',
                lat: 48.2173,
                lng: 16.3861,
            },
            {
                title: 'Zombie Apocalypse: Survival',
                description: 'Survive the zombie outbreak and find the cure in this intense urban escape!',
                difficulty: 'Expert',
                duration: 90,
                price: 49.99,
                maxPlayers: 10,
                minPlayers: 4,
                thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800',
                images: ['https://images.unsplash.com/photo-1505630285034-8c081e649033?w=800'],
                isActive: true,
                tags: ['horror', 'action', 'expert'],
                place: 'Industrial Zone',
                distance: '3.4 km',
                lat: 48.1823,
                lng: 16.4021,
            },
            {
                title: 'Secrets of Ancient Egypt',
                description: 'Uncover the secrets of the pharaohs in this biological-themed archaeological adventure!',
                difficulty: 'Medium',
                duration: 60,
                price: 34.99,
                maxPlayers: 6,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800',
                images: ['https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800'],
                isActive: true,
                tags: ['history', 'puzzle'],
                place: 'Museum District',
                distance: '1.5 km',
                lat: 48.2012,
                lng: 16.3582,
            },
            {
                title: 'The Galactic Jailbreak',
                description: 'You are locked in a nebula prison. Rig the electronics to escape into space!',
                difficulty: 'Hard',
                duration: 70,
                price: 44.99,
                maxPlayers: 6,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
                images: ['https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800'],
                isActive: true,
                tags: ['sci-fi', 'space', 'puzzle'],
                place: 'Space Center',
                distance: '5.0 km',
                lat: 48.2401,
                lng: 16.4231,
            },
            {
                title: 'The Alchemist\'s Lab',
                description: 'Brew the elixir of life using hidden formulas before the Inquisition arrives!',
                difficulty: 'Medium',
                duration: 55,
                price: 28.00,
                maxPlayers: 4,
                minPlayers: 1,
                thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800',
                images: ['https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800'],
                isActive: true,
                tags: ['magic', 'history', 'alchemy'],
                place: 'Old Market',
                distance: '1.1 km',
                lat: 48.2091,
                lng: 16.3701,
            },
            {
                title: 'Deep Sea Discovery',
                description: 'Explore a sunken submarine and find the lost coordinates of Atlantis.',
                difficulty: 'Easy',
                duration: 50,
                price: 32.50,
                maxPlayers: 5,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800',
                images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'],
                isActive: true,
                tags: ['underwater', 'adventure'],
                place: 'The Pier',
                distance: '2.2 km',
                lat: 48.2212,
                lng: 16.3934,
            },
            {
                title: 'Midnight in Tokyo',
                description: 'A neon-noir mystery. Solve the disappearance of a tech CEO in the heart of Shibuya.',
                difficulty: 'Hard',
                duration: 80,
                price: 35.00,
                maxPlayers: 4,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
                images: ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800'],
                isActive: true,
                tags: ['noir', 'cyberpunk', 'mystery'],
                place: 'City Center',
                distance: '1.8 km',
                lat: 48.2105,
                lng: 16.3722,
            },
            {
                title: 'The Forest Witch',
                description: 'Escape the enchanted woods before the moon reaches its peak and the ritual begins.',
                difficulty: 'Medium',
                duration: 65,
                price: 27.50,
                maxPlayers: 6,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
                images: ['https://images.unsplash.com/photo-1511497584788-876760111969?w=800'],
                isActive: true,
                tags: ['fantasy', 'nature', 'horror'],
                place: 'Woodland Park',
                distance: '4.5 km',
                lat: 48.2532,
                lng: 16.3121,
            },
            {
                title: 'Steam Engine Sabotage',
                description: 'A steampunk thriller. Stop the train from crashing by solving mechanical puzzles.',
                difficulty: 'Hard',
                duration: 60,
                price: 33.00,
                maxPlayers: 8,
                minPlayers: 3,
                thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800',
                images: ['https://images.unsplash.com/photo-1474487548417-781f27ac8124?w=800'],
                isActive: true,
                tags: ['steampunk', 'action', 'mechanical'],
                place: 'Central Station',
                distance: '0.5 km',
                lat: 48.1852,
                lng: 16.3761,
            },
            {
                title: 'The Art Gallery Heist',
                description: 'Swap the masterpiece with a fake and bypass the laser security system.',
                difficulty: 'Medium',
                duration: 70,
                price: 31.99,
                maxPlayers: 4,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1518998053502-517e296a2bd2?w=800',
                images: ['https://images.unsplash.com/photo-1544923246-77307dd654ca?w=800'],
                isActive: true,
                tags: ['heist', 'stealth', 'modern'],
                place: 'Gallery Row',
                distance: '1.4 km',
                lat: 48.2045,
                lng: 16.3654,
            },
            {
                title: 'Escape from Chernobyl',
                description: 'Navigate the ghost city and find the emergency exit before the radiation levels peak.',
                difficulty: 'Expert',
                duration: 100,
                price: 55.00,
                maxPlayers: 5,
                minPlayers: 1,
                thumbnail: 'https://images.unsplash.com/photo-1517404212328-333d73062631?w=800',
                images: ['https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?w=800'],
                isActive: true,
                tags: ['survival', 'history', 'intense'],
                place: 'Abandoned District',
                distance: '6.7 km',
                lat: 48.2891,
                lng: 16.4521,
            },
            {
                title: 'Sherlock\'s Final Case',
                description: 'The great detective has vanished. Follow his trail through 221B Baker St.',
                difficulty: 'Expert',
                duration: 90,
                price: 40.00,
                maxPlayers: 4,
                minPlayers: 1,
                thumbnail: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800',
                images: ['https://images.unsplash.com/photo-1473186578172-c141e6798ee4?w=800'],
                isActive: true,
                tags: ['detective', 'mystery', 'iconic'],
                place: 'Upper City',
                distance: '2.0 km',
                lat: 48.2123,
                lng: 16.3789,
            },
            {
                title: 'Carnival of Shadows',
                description: 'The fun ends when the sun goes down. Can you leave the fairgrounds alive?',
                difficulty: 'Medium',
                duration: 60,
                price: 26.99,
                maxPlayers: 10,
                minPlayers: 2,
                thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800',
                images: ['https://images.unsplash.com/photo-1505155485765-d0af504a0983?w=800'],
                isActive: true,
                tags: ['carnival', 'horror', 'thriller'],
                place: 'Prater Park',
                distance: '3.1 km',
                lat: 48.2166,
                lng: 16.3984,
            }
        ];

        await Game.insertMany(games);
        console.log(`🎮 Created ${games.length} sample games`);

        console.log('\n✨ Seed completed successfully!');
        console.log('\n📝 Admin Login: admin@example.com / admin123');

        await mongoose.disconnect();
        console.log('\n👋 Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seed();
