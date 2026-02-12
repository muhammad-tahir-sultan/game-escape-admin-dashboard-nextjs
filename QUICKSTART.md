# 🚀 Quick Start Guide

Get your Escape Game Admin Dashboard up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Setup MongoDB

### Option A: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Your connection string: `mongodb://localhost:27017/escape_game_admin`

### Option B: MongoDB Atlas (Cloud)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Replace in `.env.local`

## Step 3: Configure Environment

The `.env.local` file is already created. Update if needed:

```env
MONGODB_URI=mongodb://localhost:27017/escape_game_admin
SESSION_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

**Important**: Generate a secure SESSION_SECRET for production:
```bash
openssl rand -base64 32
```

## Step 4: Seed the Database

Populate with sample data and admin user:

```bash
npm run seed
```

This creates:
- ✅ Admin user (email: `admin@example.com`, password: `admin123`)
- ✅ 5 sample escape room games

## Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 6: Login

Use the seeded credentials:
- **Email**: `admin@example.com`
- **Password**: `admin123`

## 🎉 You're Ready!

You should now see:
1. ✨ Beautiful dashboard with stats
2. 🎮 Games management page with 5 sample games
3. 🔐 Secure authentication

## Next Steps

### Change Admin Password
1. Go to Settings (coming soon) or update directly in database
2. Hash new password with bcrypt

### Add Your Games
1. Navigate to Games section
2. Click "Add Game"
3. Fill in details
4. Use image URLs (Unsplash, Cloudinary, etc.)

### Customize Design
- Edit `app/globals.css` for colors
- Modify components in `components/ui/`
- Update gradients and effects

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env.local`
- Verify network access (for Atlas)

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Authentication Issues
- Clear browser cookies
- Check AUTH_SECRET is set
- Verify user exists in database

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🎨 Customization Tips

### Change Primary Color
```css
/* app/globals.css */
--primary: 263 70% 50%; /* Change these values */
```

### Add New Menu Item
```typescript
// components/layout/Sidebar.tsx
const menuItems = [
  // ... existing items
  { icon: YourIcon, label: 'New Page', href: '/dashboard/new' },
];
```

### Create New Page
```bash
# Create new page file
touch app/dashboard/your-page/page.tsx
```

Happy coding! 🎮✨
