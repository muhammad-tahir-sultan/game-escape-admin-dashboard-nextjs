'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Users, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Link from 'next/link';

// Animation variants
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};

interface DashboardContentProps {
    stats: {
        totalGames: number;
        activeGames: number;
        totalValue: number;
        difficultyRate: number;
        recentGames: any[];
        distribution: {
            Easy: number;
            Medium: number;
            Hard: number;
        };
        activePercentage: number;
        newGamesCount: number;
        avgPrice: number | string;
    };
}

export default function DashboardContent({ stats }: DashboardContentProps) {
    const statCards = [
        {
            title: 'Total Games',
            value: stats.totalGames,
            icon: Gamepad2,
            color: 'from-purple-500 to-pink-500',
            change: `+${stats.newGamesCount} this week`,
            trend: 'up'
        },
        {
            title: 'Active Ratio',
            value: `${stats.activePercentage}%`,
            icon: TrendingUp,
            color: 'from-blue-500 to-cyan-500',
            change: `${stats.activeGames} running`,
            trend: 'up'
        },
        {
            title: 'Inventory Value',
            value: `$${stats.totalValue.toLocaleString()}`,
            icon: DollarSign,
            color: 'from-green-500 to-emerald-500',
            change: `$${stats.avgPrice} avg`,
            trend: 'up'
        },
        {
            title: 'Pro Difficulty',
            value: `${stats.difficultyRate}%`,
            icon: Users,
            color: 'from-orange-500 to-red-500',
            change: 'Overall',
            trend: 'up'
        },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Welcome Header */}
            <motion.div variants={item} className="relative overflow-hidden rounded-2xl glass-strong p-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-2">
                        Welcome Back, Admin! 👋
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Here's what's happening with your escape games today. You have <span className="text-primary font-medium">{stats.activeGames} active missions</span> currently available for booking.
                    </p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div key={index} variants={item}>
                            <Card className="relative overflow-hidden group h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex items-start justify-between relative z-10">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                                        <h3 className="text-3xl font-bold mb-2 tracking-tight group-hover:scale-105 transition-transform origin-left">
                                            {stat.value}
                                        </h3>
                                        <div className="flex items-center gap-1 text-sm text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full w-fit">
                                            <ArrowUpRight className="w-3 h-3" />
                                            <span>{stat.change}</span>
                                        </div>
                                    </div>

                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                {/* Decorative gradient line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Games - Spans 2 columns */}
                <motion.div variants={item} className="lg:col-span-2">
                    <Card className="h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Gamepad2 className="w-5 h-5 text-primary" />
                                Recently Added Missions
                            </h3>
                            <Link href="/dashboard/games" className="text-sm text-primary hover:text-accent transition-colors">View All</Link>
                        </div>

                        <div className="space-y-4">
                            {stats.recentGames.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No games found.</p>
                            ) : (
                                stats.recentGames.map((game) => (
                                    <div
                                        key={game._id}
                                        className="group flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
                                    >
                                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                                            <img
                                                src={game.thumbnail || 'https://via.placeholder.com/150'}
                                                alt={game.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{game.title}</h4>
                                            <p className="text-sm text-muted-foreground">{game.duration} mins • <span className="text-primary">{game.difficulty}</span></p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${game.isActive
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                }`}>
                                                {game.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                            <span className="text-xs text-muted-foreground">${game.price}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </motion.div>

                {/* Quick Stats / Distribution */}
                <motion.div variants={item}>
                    <Card className="h-full">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Users className="w-5 h-5 text-accent" />
                            Mission Distribution
                        </h3>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Easy Missions</span>
                                    <span className="font-medium">{stats.distribution.Easy}%</span>
                                </div>
                                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats.distribution.Easy}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Medium Missions</span>
                                    <span className="font-medium">{stats.distribution.Medium}%</span>
                                </div>
                                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats.distribution.Medium}%` }}
                                        transition={{ duration: 1, delay: 0.7 }}
                                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Hard / Expert Missions</span>
                                    <span className="font-medium">{stats.distribution.Hard}%</span>
                                </div>
                                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats.distribution.Hard}%` }}
                                        transition={{ duration: 1, delay: 0.9 }}
                                        className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-[0_0_10px_rgba(248,113,113,0.5)]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Total Revenue Box */}
                        <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                            <p className="text-sm text-muted-foreground mb-1">Total Game Inventory Value</p>
                            <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                                ${stats.totalValue.toLocaleString()}
                            </h4>
                            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                Real-time inventory calculation
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
