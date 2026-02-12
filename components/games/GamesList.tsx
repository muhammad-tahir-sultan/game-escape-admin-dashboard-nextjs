'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GameForm from '@/components/games/GameForm';
import GameCard from '@/components/games/GameCard';

interface GamesListProps {
    initialGames: any[];
}

export default function GamesList({ initialGames }: GamesListProps) {
    const [games, setGames] = useState(initialGames);

    useEffect(() => {
        setGames(initialGames);
    }, [initialGames]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState('all');

    const filteredGames = games.filter((game) => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = filterDifficulty === 'all' || game.difficulty === filterDifficulty;
        return matchesSearch && matchesDifficulty;
    });

    function handleEdit(game: any) {
        setSelectedGame(game);
        setIsFormOpen(true);
    }

    function handleCloseForm() {
        setIsFormOpen(false);
        setSelectedGame(null);
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gradient mb-2">Games Management</h1>
                    <p className="text-muted-foreground">Manage your escape room games</p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Game
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search games..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 glass rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-muted-foreground" />
                        <select
                            value={filterDifficulty}
                            onChange={(e) => setFilterDifficulty(e.target.value)}
                            className="px-4 py-2.5 rounded-lg bg-[#1a1a20] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
                        >
                            <option value="all" className="bg-[#1a1a20] text-white">All Difficulties</option>
                            <option value="Easy" className="bg-[#1a1a20] text-white">Easy</option>
                            <option value="Medium" className="bg-[#1a1a20] text-white">Medium</option>
                            <option value="Hard" className="bg-[#1a1a20] text-white">Hard</option>
                            <option value="Expert" className="bg-[#1a1a20] text-white">Expert</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Games Grid */}
            {filteredGames.length === 0 ? (
                <Card className="text-center py-12">
                    <p className="text-muted-foreground">No games found. Create your first game!</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game, index) => (
                        <motion.div
                            key={game._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GameCard game={game} onEdit={handleEdit} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Form Modal */}
            <GameForm
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                game={selectedGame}
            />
        </div>
    );
}
