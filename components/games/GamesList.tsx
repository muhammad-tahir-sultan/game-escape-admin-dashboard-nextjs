'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Gamepad2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GameForm from '@/components/games/GameForm';
import GameCard from '@/components/games/GameCard';
import Select from '@/components/ui/Select';
import EmptyState from '@/components/ui/EmptyState';

const filterOptions = [
    { label: 'All Difficulties', value: 'all' },
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' },
    { label: 'Expert', value: 'Expert' },
];

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
            <Card className="relative z-20">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                        <input
                            type="search"
                            placeholder="Search games..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 glass rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 min-w-[200px]">
                        <Filter className="w-5 h-5 text-muted-foreground shrink-0" />
                        <Select
                            value={filterDifficulty}
                            onChange={(val) => setFilterDifficulty(val)}
                            options={filterOptions}
                            className="flex-1"
                            size="sm"
                        />
                    </div>
                </div>
            </Card>
            <div className="pt-2" />

            {/* Games Grid */}
            {filteredGames.length === 0 ? (
                <EmptyState
                    icon={Gamepad2}
                    title={searchTerm || filterDifficulty !== 'all' ? "No matches found" : "No missions found"}
                    description={searchTerm || filterDifficulty !== 'all'
                        ? "Try adjusting your search filters to find what you're looking for."
                        : "Your mission gallery is empty. Let's create something spectacular!"}
                    actionLabel={!(searchTerm || filterDifficulty !== 'all') ? "Create Mission" : undefined}
                    onAction={() => setIsFormOpen(true)}
                />
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
