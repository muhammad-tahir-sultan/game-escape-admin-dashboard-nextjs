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
    ChevronRight,
    PanelLeftClose,
    PanelLeftOpen
} from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import { SidebarSkeleton } from './SidebarSkeleton';
import { useSidebar } from '@/context/SidebarContext';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Gamepad2, label: 'Games', href: '/dashboard/games' },
    { icon: Users, label: 'Users', href: '/dashboard/users' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    async function handleConfirmLogout() {
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
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-strong rounded-lg hover:bg-white/10 transition-colors"
            >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {showLogoutConfirm && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLogoutConfirm(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-[110] p-4 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="pointer-events-auto w-full max-w-sm glass-strong rounded-3xl p-8 border border-white/10 shadow-2xl text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                                    <LogOut className="w-8 h-8 text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Ready to Leave?</h3>
                                <p className="text-muted-foreground mb-8">
                                    Are you sure you want to log out of your session?
                                </p>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleConfirmLogout}
                                        className="cursor-pointer w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/20 active:scale-[0.98]"
                                    >
                                        Log Out
                                    </button>
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="cursor-pointer w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all border border-white/10 active:scale-[0.98]"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: isCollapsed ? 80 : 280,
                    x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -280 : 0)
                }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className={`
                    fixed lg:sticky top-0 left-0 h-screen z-40
                    glass-strong border-r border-white/10 overflow-hidden
                `}
            >
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-500/10 to-transparent" />
                </div>

                <div className="flex flex-col h-full p-4">
                    {/* Logo Area */}
                    <div className={`mb-8 flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
                        <div className="w-10 h-10 shrink-0 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <span className="text-xl font-bold text-white">E</span>
                        </div>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 whitespace-nowrap">
                                    Escape Admin
                                </h1>
                                <p className="text-xs text-muted-foreground">Premium Dashboard</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="relative group block"
                                >
                                    <div
                                        className={`
                                            relative z-10 flex items-center gap-3 px-3 py-3 rounded-xl
                                            transition-all duration-300
                                            ${isActive
                                                ? 'text-white'
                                                : 'text-muted-foreground hover:text-white hover:bg-white/5'
                                            }
                                            ${isCollapsed ? 'justify-center' : ''}
                                        `}
                                    >
                                        <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-white' : 'group-hover:text-white'}`} />

                                        {!isCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="font-medium whitespace-nowrap"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}

                                        {isActive && !isCollapsed && (
                                            <motion.div
                                                layoutId="active-nav-arrow"
                                                className="ml-auto"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                            >
                                                <ChevronRight className="w-4 h-4 text-white/70" />
                                            </motion.div>
                                        )}
                                    </div>

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

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-white/10 space-y-1">
                        {/* Collapse Toggle (Desktop only) */}
                        <button
                            onClick={toggleSidebar}
                            className={`hidden lg:flex cursor-pointer items-center gap-3 w-full px-3 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all duration-200 group ${isCollapsed ? 'justify-center' : ''}`}
                            title={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
                        >
                            {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                            {!isCollapsed && <span className="font-medium text-sm">Collapse Sidebar</span>}
                        </button>

                        {/* Logout */}
                        <button
                            onClick={handleLogoutClick}
                            className={`flex cursor-pointer items-center gap-3 w-full px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <LogOut className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform cursor-pointer" />
                            {!isCollapsed && <span className="font-medium cursor-pointer">Logout</span>}
                        </button>
                    </div>
                </div>
            </motion.aside>
        </>
    );
}
