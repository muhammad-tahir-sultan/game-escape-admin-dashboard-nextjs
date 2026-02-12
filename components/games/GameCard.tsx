'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Edit, Trash2, Clock, Users, DollarSign, Power, MoreVertical, PlayCircle } from 'lucide-react';
import { deleteGame, toggleGameStatus } from '@/app/actions/games';
import { toast } from 'react-hot-toast';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

interface GameCardProps {
    game: any;
    onEdit: (game: any) => void;
}

const difficultyColors = {
    Easy: 'from-green-500 to-emerald-500',
    Medium: 'from-blue-500 to-cyan-500',
    Hard: 'from-orange-500 to-red-500',
    Expert: 'from-red-500 to-pink-500',
};

export default function GameCard({ game, onEdit }: GameCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isToggling, setIsToggling] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        const result = await deleteGame(game._id);
        if (!result.error) {
            toast.success('Game deleted successfully');
            setShowDeleteDialog(false);
            router.refresh();
        } else {
            toast.error(result.error);
            setIsDeleting(false);
            setShowDeleteDialog(false);
        }
    }

    async function handleToggleStatus() {
        setIsToggling(true);
        const result = await toggleGameStatus(game._id);
        if (!result.error) {
            toast.success(`Game ${game.isActive ? 'deactivated' : 'activated'}`);
            router.refresh();
            // Reset loading state after a slight delay to allow UI to update
            setTimeout(() => setIsToggling(false), 500);
        } else {
            toast.error(result.error);
            setIsToggling(false);
        }
    }

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
            >
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onEdit(game)}>
                    <img
                        src={game.thumbnail || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop'}
                        alt={game.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`
            px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-lg
            ${game.isActive
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }
          `}>
                            {game.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    {/* Edit Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(game); }}
                            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-md border border-white/20 transition-all transform hover:scale-110 cursor-pointer"
                        >
                            <Edit className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3
                                className="text-lg font-bold text-white group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
                                onClick={() => onEdit(game)}
                            >
                                {game.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`
                        text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r 
                        ${difficultyColors[game.difficulty as keyof typeof difficultyColors] || 'from-gray-400 to-gray-500'}
                    `}>
                                    {game.difficulty}
                                </span>
                                <span className="text-white/20">•</span>
                                <span className="text-xs text-muted-foreground">{game.players || '2-6'} Players</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-white">${game.price}</p>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                        {game.description || 'No description available for this mission.'}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 rounded-lg p-2">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            <span>{game.duration} mins</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 rounded-lg p-2">
                            <Users className="w-3.5 h-3.5 text-accent" />
                            <span>{game.minPlayers}-{game.maxPlayers} ppl</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onEdit(game)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-sm font-medium hover:bg-white/10 text-white transition-colors cursor-pointer group/edit"
                        >
                            <Edit className="w-4 h-4 text-muted-foreground group-hover/edit:text-primary transition-colors" />
                            <span>Edit</span>
                        </motion.button>

                        <div className="w-[1px] h-8 bg-white/10 mx-1" />

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleToggleStatus}
                            disabled={isToggling}
                            title={game.isActive ? "Deactivate Game" : "Activate Game"}
                            className={`p-2 rounded-xl border transition-all cursor-pointer ${game.isActive
                                ? 'border-green-500/20 bg-green-500/10 hover:bg-green-500/20 text-green-400'
                                : 'border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white'
                                }`}
                        >
                            <Power className={`w-4 h-4 ${isToggling ? 'animate-pulse' : ''}`} />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowDeleteDialog(true)}
                            disabled={isDeleting}
                            title="Delete Game"
                            className="p-2 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all cursor-pointer"
                        >
                            <Trash2 className={`w-4 h-4 ${isDeleting ? 'animate-pulse' : ''}`} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Delete Game?"
                description={`Are you sure you want to delete "${game.title}"? This action cannot be undone and all mission data will be lost.`}
                confirmText="Delete Mission"
                isLoading={isDeleting}
                variant="danger"
            />
        </>
    );
}
