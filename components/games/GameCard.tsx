'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Edit, Trash2, Clock, Users, Power } from 'lucide-react';
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

    const handleDelete = async () => {
        setIsDeleting(true);
        const result = await deleteGame(game._id);
        if (!result.error) {
            toast.success('Game deleted successfully');
            router.refresh();
        } else {
            toast.error(result.error);
        }
        setIsDeleting(false);
        setShowDeleteDialog(false);
    };

    const handleToggleStatus = async () => {
        setIsToggling(true);
        const result = await toggleGameStatus(game._id);
        if (!result.error) {
            toast.success(`Game ${game.isActive ? 'deactivated' : 'activated'}`);
            router.refresh();
            setTimeout(() => setIsToggling(false), 500);
        } else {
            toast.error(result.error);
            setIsToggling(false);
        }
    };

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
            >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onEdit(game)}>
                    <img
                        src={game.thumbnail || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop'}
                        alt={game.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3">
                        <StatusBadge isActive={game.isActive} />
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 transform hover:scale-110 transition-all">
                            <Edit className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors cursor-pointer line-clamp-1" onClick={() => onEdit(game)}>
                                {game.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${difficultyColors[game.difficulty as keyof typeof difficultyColors] || 'from-gray-400 to-gray-500'}`}>
                                    {game.difficulty}
                                </span>
                                <span className="text-white/20">•</span>
                                <span className="text-xs text-muted-foreground">{game.minPlayers}-{game.maxPlayers} Players</span>
                            </div>
                        </div>
                        <p className="text-lg font-bold text-white">${game.price}</p>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                        {game.description || 'No description available for this mission.'}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <InfoTag icon={<Clock className="w-3.5 h-3.5 text-primary" />} label={`${game.duration} mins`} />
                        <InfoTag icon={<Users className="w-3.5 h-3.5 text-accent" />} label={`${game.minPlayers}-${game.maxPlayers} ppl`} />
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                        <ActionButton
                            onClick={() => onEdit(game)}
                            icon={<Edit className="w-4 h-4" />}
                            label="Edit"
                            className="flex-1"
                        />
                        <div className="w-[1px] h-8 bg-white/10 mx-1" />
                        <IconButton
                            onClick={handleToggleStatus}
                            icon={<Power className={`w-4 h-4 ${isToggling ? 'animate-pulse' : ''}`} />}
                            isActive={game.isActive}
                            isLoading={isToggling}
                            activeClass="border-green-500/20 bg-green-500/10 text-green-400"
                        />
                        <IconButton
                            onClick={() => setShowDeleteDialog(true)}
                            icon={<Trash2 className={`w-4 h-4 ${isDeleting ? 'animate-pulse' : ''}`} />}
                            variant="danger"
                            isLoading={isDeleting}
                        />
                    </div>
                </div>
            </motion.div>

            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Delete Game?"
                description={`Are you sure you want to delete "${game.title}"? This action cannot be undone.`}
                confirmText="Delete Mission"
                isLoading={isDeleting}
                variant="danger"
            />
        </>
    );
}

// --- Internal Sub-components ---

function StatusBadge({ isActive }: { isActive: boolean }) {
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-lg ${isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
            }`}>
            {isActive ? 'Active' : 'Inactive'}
        </span>
    );
}

function InfoTag({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 rounded-lg p-2">
            {icon}
            <span>{label}</span>
        </div>
    );
}

function ActionButton({ onClick, icon, label, className = '' }: any) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-sm font-medium hover:bg-white/10 text-white transition-all cursor-pointer ${className}`}
        >
            {icon}
            <span>{label}</span>
        </motion.button>
    );
}

function IconButton({ onClick, icon, isActive, variant, isLoading, activeClass }: any) {
    const baseClass = "p-2 rounded-xl border transition-all cursor-pointer";
    const variantClass = variant === 'danger'
        ? "border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400"
        : isActive
            ? activeClass
            : "border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white";

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            disabled={isLoading}
            className={`${baseClass} ${variantClass}`}
        >
            {icon}
        </motion.button>
    );
}

