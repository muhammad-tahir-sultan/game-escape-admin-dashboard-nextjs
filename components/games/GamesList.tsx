'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Gamepad2, Loader2, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GameForm from '@/components/games/GameForm';
import GameCard from '@/components/games/GameCard';
import Select from '@/components/ui/Select';
import EmptyState from '@/components/ui/EmptyState';
import Pagination from '@/components/ui/Pagination';
import { getGames } from '@/app/actions/games';

const filterOptions = [
    { label: 'All Difficulties', value: 'all' },
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' },
    { label: 'Expert', value: 'Expert' },
];

const pageSizeOptions = [
    { label: '6 Per Page', value: '6' },
    { label: '12 Per Page', value: '12' },
    { label: '18 Per Page', value: '18' },
    { label: '24 Per Page', value: '24' },
    { label: 'Custom...', value: 'custom' },
];

interface GamesListProps {
    initialData: {
        games: any[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
}

export default function GamesList({ initialData }: GamesListProps) {
    const [games, setGames] = useState(initialData.games);
    const [pagination, setPagination] = useState(initialData.pagination);
    const [isLoading, setIsLoading] = useState(false);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [isCustomSize, setIsCustomSize] = useState(false);

    const fetchGames = useCallback(async (search: string, diff: string, page: number, limit: number) => {
        setIsLoading(true);
        try {
            const result = await getGames(search, diff, page, limit);
            if (result.success) {
                setGames(result.games);
                setPagination(result.pagination);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial load sync - handle initial data correctly
    useEffect(() => {
        setGames(initialData.games);
        setPagination(initialData.pagination);
    }, [initialData]);

    // Update whenever filters or page size change (Reset to page 1)
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1);
            fetchGames(searchTerm, filterDifficulty, 1, pageSize);
        }, 400); // 400ms debounce
        return () => clearTimeout(timer);
    }, [searchTerm, filterDifficulty, pageSize, fetchGames]);

    // Update whenever page changes (but not filters or page size)
    useEffect(() => {
        if (currentPage !== pagination.page) {
            fetchGames(searchTerm, filterDifficulty, currentPage, pageSize);
        }
    }, [currentPage, fetchGames, searchTerm, filterDifficulty, pageSize, pagination.page]);

    function handleEdit(game: any) {
        setSelectedGame(game);
        setIsFormOpen(true);
    }

    function handleCloseForm() {
        setIsFormOpen(false);
        setSelectedGame(null);
    }

    const handlePageSizeChange = (val: string) => {
        if (val === 'custom') {
            setIsCustomSize(true);
        } else {
            setIsCustomSize(false);
            setPageSize(Number(val));
        }
    };

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
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Add Game
                </Button>
            </div>

            {/* Filters */}
            <Card className="relative z-20">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 z-10" />
                        <input
                            type="search"
                            placeholder="Search missions by title or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[#0a0a0c] border border-white/5 rounded-xl text-foreground placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium text-sm shadow-inner"
                        />
                        {isLoading && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 min-w-[200px]">
                            <Filter className="w-4 h-4 text-white/20 shrink-0" />
                            <Select
                                value={filterDifficulty}
                                onChange={(val) => setFilterDifficulty(val)}
                                options={filterOptions}
                                className="flex-1"
                                size="md"
                            />
                        </div>
                        <div className="min-w-[140px] flex items-center gap-2">
                            {isCustomSize ? (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={pageSize}
                                        onChange={(e) => setPageSize(Math.max(1, Number(e.target.value)))}
                                        className="w-20 px-3 py-3 bg-[#0a0a0c] border border-primary/30 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all font-bold text-sm text-center shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                                    />
                                    <button
                                        onClick={() => setIsCustomSize(false)}
                                        className="p-3 rounded-xl bg-white/5 text-muted-foreground hover:text-white transition-colors border border-white/5"
                                        title="Back to presets"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ) : (
                                <Select
                                    value={String(pageSize)}
                                    onChange={handlePageSizeChange}
                                    options={pageSizeOptions}
                                    size="md"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            <div className="pt-2" />

            {/* Games Grid */}
            <AnimatePresence mode="wait">
                {games.length === 0 && !isLoading ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <EmptyState
                            icon={Gamepad2}
                            title={searchTerm || filterDifficulty !== 'all' ? "No matches found" : "No missions found"}
                            description={searchTerm || filterDifficulty !== 'all'
                                ? "Try adjusting your search filters to find what you're looking for."
                                : "Your mission gallery is empty. Let's create something spectacular!"}
                            actionLabel={!(searchTerm || filterDifficulty !== 'all') ? "Create Mission" : undefined}
                            onAction={() => setIsFormOpen(true)}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-10"
                    >
                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${isLoading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                            {games.map((game, index) => (
                                <motion.div
                                    key={game._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <GameCard game={game} onEdit={handleEdit} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Premium Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={setCurrentPage}
                            isLoading={isLoading}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form Modal */}
            <GameForm
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                game={selectedGame}
            />
        </div>
    );
}

