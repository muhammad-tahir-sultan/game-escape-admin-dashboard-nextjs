'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Gamepad2,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import { SidebarSkeleton } from './SidebarSkeleton';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Gamepad2, label: 'Games', href: '/dashboard/games' },
    { icon: Users, label: 'Users', href: '/dashboard/users' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    async function handleLogout() {
        await logoutAction();
        window.location.href = '/login';
    }

    // Use skeleton during hydration to prevent bad UX
    if (!mounted) {
        return <SidebarSkeleton />;
    }

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-strong rounded-lg hover:bg-white/10 transition-colors"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ x: isOpen ? 0 : 0 }} // On mobile we animate, on desktop it's static
                className={`
          fixed lg:sticky top-0 left-0 h-screen w-72 z-40
          glass-strong border-r border-white/10
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-500/10 to-transparent" />
                </div>

                <div className="flex flex-col h-full p-6">
                    {/* Logo */}
                    <div className="mb-8 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <span className="text-xl font-bold text-white">E</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                Escape Admin
                            </h1>
                            <p className="text-xs text-muted-foreground">Premium Dashboard</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="relative group block"
                                >
                                    <div
                                        className={`
                      relative z-10 flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-300
                      ${isActive
                                                ? 'text-white'
                                                : 'text-muted-foreground hover:text-white hover:bg-white/5'
                                            }
                    `}
                                    >
                                        <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                                        <span className="font-medium">{item.label}</span>

                                        {isActive && (
                                            <motion.div
                                                layoutId="active-nav"
                                                className="absolute right-4"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                            >
                                                <ChevronRight className="w-4 h-4 text-white/70" />
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Active Background */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-bg"
                                            className="absolute inset-0 rounded-xl gradient-primary opacity-100 shadow-lg shadow-purple-500/25"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="pt-6 border-t border-white/10">
                        <button
                            onClick={handleLogout}
                            className="flex cursor-pointer items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
                        >
                            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </motion.aside>
        </>
    );
}
