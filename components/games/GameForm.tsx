'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Gamepad2, MapPin, Image as ImageIcon, ListTodo } from 'lucide-react';
import { createGame, updateGame } from '@/app/actions/games';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import BasicInfo from './form-sections/BasicInfo';
import LocationInfo from './form-sections/LocationInfo';
import MediaInfo from './form-sections/MediaInfo';
import RiddleManager from './form-sections/RiddleManager';
import ConfirmCloseModal from './game-form/ConfirmCloseModal';
import FormSidebar from './game-form/FormSidebar';
import FormHeader from './game-form/FormHeader';
import FormFooter from './game-form/FormFooter';

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
    const [isDirty, setIsDirty] = useState(false);

    // Reset dirty state when form is opened
    useEffect(() => {
        if (isOpen) {
            setIsDirty(false);
        }
    }, [isOpen]);

    const handleAttemptClose = () => {
        if (!isDirty) {
            onClose();
        } else {
            setShowConfirmClose(true);
        }
    };

    const handleConfirmDiscard = () => {
        setIsDirty(false); // Reset dirty state on confirmation
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
        setIsDirty(true);
    };

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index).map((q, i) => ({ ...q, index: i })));
        setIsDirty(true);
    };

    const updateQuestion = (index: number, field: string, value: any) => {
        const updated = [...questions];
        updated[index] = { ...updated[index], [field]: value };
        setQuestions(updated);
        setIsDirty(true);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData(e.currentTarget);
            const isActive = formData.get('isActive') !== null;
            formData.set('isActive', String(isActive));
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

    const renderTabContent = () => {
        const sections: Record<string, { title: string; component: React.ReactNode }> = {
            general: { title: 'General Information', component: <BasicInfo game={game} /> },
            location: { title: 'Mission Location', component: <LocationInfo game={game} /> },
            media: { title: 'Media Assets & Tags', component: <MediaInfo game={game} /> },
        };

        if (activeTab === 'riddles') {
            return (
                <RiddleManager
                    questions={questions}
                    onAdd={addQuestion}
                    onRemove={removeQuestion}
                    onUpdate={updateQuestion}
                />
            );
        }

        const section = sections[activeTab];
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <h4 className="text-2xl font-bold text-white">{section.title}</h4>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                {section.component}
            </div>
        );
    };

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
                            <ConfirmCloseModal
                                isOpen={showConfirmClose}
                                onClose={() => setShowConfirmClose(false)}
                                onConfirm={handleConfirmDiscard}
                            />

                            <FormSidebar
                                tabs={TABS}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                game={game}
                                isLoading={isLoading}
                                onDiscard={handleAttemptClose}
                            />

                            <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0c]">
                                <FormHeader onClose={handleAttemptClose} />

                                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                    <form
                                        id="mission-form"
                                        onSubmit={handleSubmit}
                                        onInput={() => setIsDirty(true)}
                                        className="h-full"
                                    >
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
                                            >
                                                {renderTabContent()}
                                            </motion.div>
                                        </AnimatePresence>

                                        <div className="h-20" />
                                    </form>
                                </div>

                                <FormFooter tabs={TABS} activeTab={activeTab} />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

