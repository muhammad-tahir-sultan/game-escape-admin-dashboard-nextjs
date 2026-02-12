'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, AlertCircle, Gamepad2, MapPin, Image as ImageIcon, ListTodo, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { createGame, updateGame } from '@/app/actions/games';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import BasicInfo from './form-sections/BasicInfo';
import LocationInfo from './form-sections/LocationInfo';
import MediaInfo from './form-sections/MediaInfo';
import RiddleManager from './form-sections/RiddleManager';

interface GameFormProps {
    isOpen: boolean;
    onClose: () => void;
    game?: any;
}

const TABS = [
    { id: 'general', label: 'General', icon: Gamepad2, color: 'text-purple-400' },
    { id: 'location', label: 'Location', icon: MapPin, color: 'text-blue-400' },
    { id: 'media', label: 'Media & Tags', icon: ImageIcon, color: 'text-pink-400' },
    { id: 'riddles', label: 'Riddles', icon: ListTodo, color: 'text-emerald-400' },
];

export default function GameForm({ isOpen, onClose, game }: GameFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [questions, setQuestions] = useState<any[]>(game?.questions || []);
    const [activeTab, setActiveTab] = useState('general');
    const [showConfirmClose, setShowConfirmClose] = useState(false);

    const handleAttemptClose = () => {
        setShowConfirmClose(true);
    };

    const handleConfirmDiscard = () => {
        setShowConfirmClose(false);
        onClose();
    };

    const addQuestion = () => {
        const newQuestion = {
            name: `Objective #${questions.length + 1}`,
            text: '',
            riddle: '',
            intro: '',
            index: questions.length,
            lat: game?.lat || 0,
            lng: game?.lng || 0,
            questionType: 'textChoices',
            options: [],
            rightAnswer: '',
            rightAnswerImage: '',
            questionHint: '',
            mapImage: '',
            images: [],
            hints: [],
            explanation: { text: '', images: [], info: '', infoExplanation: '' }
        };
        setQuestions([...questions, newQuestion]);
    };

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index).map((q, i) => ({ ...q, index: i })));
    };

    const updateQuestion = (index: number, field: string, value: any) => {
        const updated = [...questions];
        updated[index] = { ...updated[index], [field]: value };
        setQuestions(updated);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData(e.currentTarget);

            // Handle checkbox sync
            const isActive = formData.get('isActive') !== null;
            formData.set('isActive', String(isActive));

            // Manually add questions to FormData as JSON since it's a complex array
            formData.set('questions', JSON.stringify(questions));

            const result = game
                ? await updateGame(game._id, formData)
                : await createGame(formData);

            if (result.error) {
                setError(result.error);
                toast.error(result.error);
            } else {
                toast.success(game ? 'Mission upgraded successfully! 🚀' : 'New adventure created! ✨');
                router.refresh();
                onClose();
            }
        } catch (err) {
            console.error('Submission error:', err);
            setError('An unexpected error occurred. Please try again.');
            toast.error('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleAttemptClose}
                        className="fixed inset-0 bg-black/90 z-[100] backdrop-blur-md"
                    />

                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="pointer-events-auto w-full max-w-5xl h-[85vh] flex overflow-hidden rounded-3xl bg-[#0a0a0c] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Confirmation Overlay */}
                            <AnimatePresence>
                                {showConfirmClose && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-[150] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            className="bg-[#16161a] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                                                <AlertCircle className="w-8 h-8 text-red-500" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Discard changes?</h3>
                                            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                                                You have unsaved modifications. Are you sure you want to exit? This action cannot be undone.
                                            </p>
                                            <div className="flex flex-col gap-3">
                                                <Button
                                                    variant="primary"
                                                    className="w-full cursor-pointer py-3 bg-red-600 hover:bg-red-700 hover:shadow-red-500/20"
                                                    onClick={handleConfirmDiscard}
                                                >
                                                    Yes, Discard
                                                </Button>
                                                <button
                                                    onClick={() => setShowConfirmClose(false)}
                                                    className="w-full py-3 text-sm font-semibold text-white/50 hover:text-white transition-colors cursor-pointer"
                                                >
                                                    Continue Editing
                                                </button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Sidebar Navigation */}
                            <div className="w-1/4 min-w-[240px] bg-[#0f0f13] border-r border-white/5 p-8 flex flex-col justify-between">
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                            {game ? 'Refine Mission' : 'New Mission'}
                                        </h2>
                                        <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-semibold opacity-50">
                                            Mission Builder
                                        </p>
                                    </div>

                                    <nav className="space-y-2">
                                        {TABS.map((tab) => {
                                            const Icon = tab.icon;
                                            const isActive = activeTab === tab.id;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    type="button"
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`
                                                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
                                                        ${isActive
                                                            ? 'bg-white/10 text-white shadow-xl shadow-black/20'
                                                            : 'text-muted-foreground hover:bg-white/5 hover:text-white/80'
                                                        }
                                                    `}
                                                >
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="activeTabGlow"
                                                            className="absolute inset-0 bg-primary/5 rounded-xl border border-primary/20 pointer-events-none"
                                                        />
                                                    )}
                                                    <Icon className={`w-5 h-5 shrink-0 relative z-10 ${isActive ? tab.color : 'opacity-50 group-hover:opacity-100 transition-opacity'}`} />
                                                    <span className="font-medium text-sm relative z-10">{tab.label}</span>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="ml-auto relative z-10"
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#8b5cf6]" />
                                                        </motion.div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                                        <label className="flex items-center justify-between cursor-pointer group">
                                            <div className="space-y-0.5">
                                                <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors inline-flex items-center gap-2">
                                                    Status
                                                </span>
                                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Visibility Control</p>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    name="isActive"
                                                    form="mission-form"
                                                    defaultChecked={game?.isActive ?? true}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-11 h-6 bg-white/5 border border-white/10 rounded-full peer peer-checked:bg-primary/20 peer-checked:border-primary/50 transition-all duration-300"></div>
                                                <div className="absolute top-1 left-1 bg-white/40 w-4 h-4 rounded-full shadow-lg transform transition-transform duration-300 peer-checked:translate-x-5 peer-checked:bg-primary"></div>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Button
                                            form="mission-form"
                                            type="submit"
                                            variant="primary"
                                            className="w-full py-2.5 rounded-xl shadow-[0_10px_20px_rgba(139,92,246,0.1)] hover:shadow-[0_12px_22px_rgba(139,92,246,0.2)] transition-all cursor-pointer font-bold text-sm"
                                            isLoading={isLoading}
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {game ? 'Update' : 'Launch'}
                                        </Button>
                                        <button
                                            type="button"
                                            onClick={handleAttemptClose}
                                            className="w-full py-2.5 text-sm font-bold text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5 rounded-xl transition-all cursor-pointer"
                                        >
                                            Discard Changes
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0c]">
                                {/* Secondary Header */}
                                <div className="h-20 shrink-0 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0a0c]/80 backdrop-blur-xl z-20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-white/10 shadow-lg">
                                            <Gamepad2 className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">Mission Configuration</h3>
                                            <p className="text-xs text-muted-foreground">Modify objectives and environmental parameters</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleAttemptClose}
                                        className="p-2.5 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-white transition-all cursor-pointer group"
                                    >
                                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                    </button>
                                </div>

                                {/* Content Scrollable */}
                                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                    <form id="mission-form" onSubmit={handleSubmit} className="h-full">
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex items-center gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-8"
                                            >
                                                <AlertCircle className="w-5 h-5 shrink-0" />
                                                {error}
                                            </motion.div>
                                        )}

                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeTab}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="space-y-6"
                                            >
                                                {activeTab === 'general' && (
                                                    <div className="space-y-6">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <h4 className="text-2xl font-bold text-white">General Information</h4>
                                                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                                        </div>
                                                        <BasicInfo game={game} />
                                                    </div>
                                                )}

                                                {activeTab === 'location' && (
                                                    <div className="space-y-6">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <h4 className="text-2xl font-bold text-white">Mission Location</h4>
                                                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                                        </div>
                                                        <LocationInfo game={game} />
                                                    </div>
                                                )}

                                                {activeTab === 'media' && (
                                                    <div className="space-y-6">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <h4 className="text-2xl font-bold text-white">Media Assets & Tags</h4>
                                                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                                        </div>
                                                        <MediaInfo game={game} />
                                                    </div>
                                                )}

                                                {activeTab === 'riddles' && (
                                                    <RiddleManager
                                                        questions={questions}
                                                        onAdd={addQuestion}
                                                        onRemove={removeQuestion}
                                                        onUpdate={updateQuestion}
                                                    />
                                                )}
                                            </motion.div>
                                        </AnimatePresence>

                                        <div className="h-20" />
                                    </form>
                                </div>

                                {/* Bottom Info Bar */}
                                <div className="h-14 shrink-0 bg-[#0f0f13] border-t border-white/5 px-8 flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                                        <span className="flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                            Auto-validation active
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span>Ready to Launch</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {TABS.map((tab) => (
                                            <div
                                                key={tab.id}
                                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeTab === tab.id ? 'bg-primary w-4' : 'bg-white/10'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
