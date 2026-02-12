'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { createGame, updateGame } from '@/app/actions/games';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface GameFormProps {
    isOpen: boolean;
    onClose: () => void;
    game?: any;
}

export default function GameForm({ isOpen, onClose, game }: GameFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData(e.currentTarget);

            // Handle checkbox: if checked, it's "on" (or value), if not, it's null.
            const isActive = formData.get('isActive') !== null;
            formData.set('isActive', String(isActive));

            console.log('Submitting form data:', Object.fromEntries(formData));

            const result = game
                ? await updateGame(game._id, formData)
                : await createGame(formData);

            if (result.error) {
                console.error('Submission error:', result.error);
                setError(result.error);
                toast.error(result.error);
            } else {
                console.log('Submission success');
                toast.success(game ? 'Game updated successfully!' : 'Game created successfully!');
                router.refresh();
                onClose();
            }
        } catch (err) {
            console.error('Unexpected error during submission:', err);
            const errorMessage = 'An unexpected error occurred. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Darker Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="pointer-events-auto w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f0f13] border border-white/10 shadow-2xl shadow-black/50"
                        >
                            <div className="p-6 md:p-8">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0f0f13] z-10 pb-4 border-b border-white/5 -mx-6 px-6 -mt-2 pt-2">
                                    <div>
                                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                            {game ? 'Edit Game' : 'Add New Game'}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {game ? 'Update the game details below' : 'Create a new escape room experience'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white text-muted-foreground transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Title</label>
                                            <input
                                                name="title"
                                                defaultValue={game?.title}
                                                required
                                                placeholder="e.g. The Haunted Mansion"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Description</label>
                                            <textarea
                                                name="description"
                                                defaultValue={game?.description}
                                                required
                                                rows={4}
                                                placeholder="Describe the mission..."
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Difficulty</label>
                                                <div className="relative">
                                                    <select
                                                        name="difficulty"
                                                        defaultValue={game?.difficulty || 'Medium'}
                                                        className="w-full px-4 py-3 rounded-xl bg-[#1a1a20] border border-white/10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all cursor-pointer"
                                                    >
                                                        <option value="Easy" className="bg-[#1a1a20] text-white">Easy</option>
                                                        <option value="Medium" className="bg-[#1a1a20] text-white">Medium</option>
                                                        <option value="Hard" className="bg-[#1a1a20] text-white">Hard</option>
                                                        <option value="Expert" className="bg-[#1a1a20] text-white">Expert</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Duration (min)</label>
                                                <input
                                                    name="duration"
                                                    type="number"
                                                    defaultValue={game?.duration || 60}
                                                    required
                                                    min={15}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Price ($)</label>
                                                <input
                                                    name="price"
                                                    type="number"
                                                    defaultValue={game?.price || 0}
                                                    required
                                                    min={0}
                                                    step="0.01"
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Min Players</label>
                                                <input
                                                    name="minPlayers"
                                                    type="number"
                                                    defaultValue={game?.minPlayers || 2}
                                                    required
                                                    min={1}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Max Players</label>
                                                <input
                                                    name="maxPlayers"
                                                    type="number"
                                                    defaultValue={game?.maxPlayers || 6}
                                                    required
                                                    min={1}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Thumbnail URL</label>
                                            <input
                                                name="thumbnail"
                                                type="url"
                                                defaultValue={game?.thumbnail}
                                                required
                                                placeholder="https://..."
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Images (URLs, comma separated)</label>
                                            <input
                                                name="images"
                                                defaultValue={game?.images?.join(', ') || ''}
                                                placeholder="https://example.com/1.jpg, https://example.com/2.jpg"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Tags (comma separated)</label>
                                            <input
                                                name="tags"
                                                defaultValue={game?.tags?.join(', ') || ''}
                                                placeholder="mystery, horror, family"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <label className="flex items-center gap-4 group cursor-pointer w-fit">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        name="isActive"
                                                        id="isActive"
                                                        defaultChecked={game?.isActive ?? true}
                                                        className="peer sr-only"
                                                    />
                                                    {/* Track */}
                                                    <div className="w-14 h-8 bg-white/5 border border-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:bg-primary/20 peer-checked:border-primary/50 transition-all duration-300 ease-in-out"></div>

                                                    {/* Thumb */}
                                                    <div className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-lg transform transition-transform duration-300 ease-in-out peer-checked:translate-x-6 peer-checked:bg-primary peer-checked:shadow-primary/50">
                                                        {/* Optional: Icon inside thumb */}
                                                        <div className="flex items-center justify-center w-full h-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">Game Status</span>
                                                    <span className="text-xs text-muted-foreground">Enable to make this game visible</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex gap-3 pt-6 mt-6 border-t border-white/10">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            disabled={isLoading}
                                            className="flex-1 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 font-medium transition-all cursor-pointer hover:border-white/20"
                                        >
                                            Cancel
                                        </button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="flex-[2] py-3 rounded-xl text-base cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all"
                                            isLoading={isLoading}
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {game ? 'Save Changes' : 'Create Game'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
