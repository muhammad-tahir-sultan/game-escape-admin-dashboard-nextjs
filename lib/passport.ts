import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// Configure Local Strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                await connectDB();

                const user = await User.findOne({ email }).select('+password');

                if (!user) {
                    return done(null, false, { message: 'Invalid credentials' });
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return done(null, false, { message: 'Invalid credentials' });
                }

                // Return user without password
                const userObj = {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };

                return done(null, userObj);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Serialize user for session
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
    try {
        await connectDB();
        const user = await User.findById(id).select('-password');

        if (!user) {
            return done(null, false);
        }

        const userObj = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        };

        done(null, userObj);
    } catch (error) {
        done(error);
    }
});

export default passport;
