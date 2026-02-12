'use client';

import { Bell } from 'lucide-react';
import { getSessionUser } from '@/app/actions/auth';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function fetchUser() {
            const u = await getSessionUser();
            setUser(u);
        }
        fetchUser();
    }, []);

    return (
        <header className="sticky top-0 z-30 glass-strong border-b border-white/10 px-6 py-4 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
                {/* Spacer to keep right alignment */}
                <div className="flex-1" />

                {/* Right section */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group"
                    >
                        <Bell className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-black/50 animate-pulse" />
                    </motion.button>

                    {/* User Profile */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group"
                    >
                        <div className="relative">
                            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-semibold shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
                                {user?.name?.[0]?.toUpperCase() || 'A'}
                            </div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
                        </div>

                        <div className="hidden md:block text-left">
                            <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                                {user?.name || 'Admin'}
                            </p>
                            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                                {user?.role || 'Admin'}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
