# 🎮 Escape Game Admin Dashboard

A premium Next.js 15 admin dashboard for managing escape room games with a stunning "Vibe Coding" aesthetic featuring glassmorphism, smooth animations, and modern UI design.

## ✨ Features

- 🔐 **Authentication** - Passport.js with Local Strategy for secure login
- 🎯 **Games Management** - Full CRUD operations for escape room games
- 📊 **Analytics Dashboard** - Real-time stats and insights
- 🎨 **Premium UI** - Glassmorphism, gradients, and Framer Motion animations
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts
- 🔒 **Role-Based Access** - Admin-only routes with middleware protection
- ⚡ **Server Actions** - Modern Next.js 15 data mutations
- 🎭 **Form Validation** - Zod schemas with React Hook Form
- 🍪 **Session Management** - Secure cookie-based sessions

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Local Strategy)
- **Sessions**: Cookie-based sessions
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or cloud)

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Update `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/escape_game_admin
   SESSION_SECRET=your-super-secret-key-change-this-in-production
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
admin-dashboard/
├── app/
│   ├── actions/          # Server actions
│   │   ├── auth.ts       # Authentication actions
│   │   └── games.ts      # Game CRUD actions
│   ├── api/              # API routes
│   │   └── auth/         # NextAuth endpoints
│   ├── dashboard/        # Dashboard pages
│   │   ├── games/        # Games management
│   │   ├── users/        # Users management
│   │   └── settings/     # Settings
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── layout.tsx        # Root layout
├── components/
│   ├── games/            # Game components
│   │   ├── GameCard.tsx
│   │   ├── GameForm.tsx
│   │   └── GamesList.tsx
│   ├── layout/           # Layout components
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   └── ui/               # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── lib/
│   ├── mongodb.ts        # Database connection
│   └── validations.ts    # Zod schemas
├── models/
│   ├── User.ts           # User model
│   └── Game.ts           # Game model
├── auth.ts               # NextAuth configuration
└── middleware.ts         # Route protection
```

## 🎨 Design Philosophy

This dashboard follows the "Vibe Coding" aesthetic:

- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Dark Theme**: Deep purples and vibrant accent colors
- **Smooth Animations**: Framer Motion for delightful interactions
- **Micro-interactions**: Hover effects and state transitions
- **Modern Typography**: Inter font family
- **Gradient Accents**: Purple to pink gradients throughout

## 🔑 First Time Setup

1. **Create your first admin account**
   - Navigate to `/register`
   - Fill in your details
   - The first user is automatically assigned admin role

2. **Login to the dashboard**
   - Use your credentials at `/login`
   - You'll be redirected to the dashboard

3. **Add your first game**
   - Go to Games section
   - Click "Add Game"
   - Fill in the game details
   - Upload images via URL (Cloudinary integration ready)

## 📊 Database Models

### User Model
```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  role: 'admin' | 'user'
  createdAt: Date
  updatedAt: Date
}
```

### Game Model
```typescript
{
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  duration: number (minutes)
  price: number
  maxPlayers: number
  minPlayers: number
  images: string[]
  thumbnail: string
  isActive: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
```

## 🔐 Authentication Flow

1. User registers or logs in via API routes
2. Credentials validated with Zod schemas
3. Password hashed with bcrypt (10 rounds)
4. Passport.js Local Strategy authenticates user
5. Session created and stored in secure HTTP-only cookie
6. Middleware validates session on protected routes
7. Role checked for admin-only access

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
SESSION_SECRET=generate-a-secure-random-string
NEXTAUTH_URL=https://yourdomain.com
```

## 🎨 Customization

### Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: 263 70% 50%;    /* Purple */
  --accent: 280 80% 60%;     /* Pink */
  /* ... more colors */
}
```

### Components

All UI components are in `components/ui/` and can be customized:
- `Button.tsx` - Button variants and sizes
- `Card.tsx` - Card animations and styles
- `Input.tsx` - Input field styling

## 📝 TODO / Roadmap

- [ ] Image upload integration (Cloudinary/S3)
- [ ] User management interface
- [ ] Settings panel
- [ ] Analytics charts (Recharts)
- [ ] Email notifications
- [ ] Booking system
- [ ] Customer reviews
- [ ] Multi-language support

## 🤝 Contributing

This is a project template. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this project for your escape room business!

## 🙏 Credits

Built with ❤️ using:
- Next.js
- Tailwind CSS
- Framer Motion
- MongoDB
- Passport.js

---

**Happy Coding! 🎮✨**
