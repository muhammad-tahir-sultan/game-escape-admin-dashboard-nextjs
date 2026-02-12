'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, MapPin, Image as ImageIcon, ListTodo } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

import ConfirmCloseModal from './game-form/ConfirmCloseModal';
import FormSidebar from './game-form/FormSidebar';
import FormHeader from './game-form/FormHeader';
import FormFooter from './game-form/FormFooter';
import FormBody from './game-form/FormBody';
import { useGameForm } from './game-form/useGameForm';

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
    const {
        methods,
        isLoading,
        error,
        questions,
        activeTab,
        setActiveTab,
        showConfirmClose,
        setShowConfirmClose,
        handleAttemptClose,
        handleConfirmDiscard,
        addQuestion,
        removeQuestion,
        updateQuestion,
        onSubmit,
        setIsDirtyState,
    } = useGameForm({ game, isOpen, onClose });

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

                            <FormProvider {...methods}>
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

                                    <FormBody
                                        activeTab={activeTab}
                                        error={error}
                                        questions={questions}
                                        onSubmit={onSubmit}
                                        setIsDirtyState={setIsDirtyState}
                                        addQuestion={addQuestion}
                                        removeQuestion={removeQuestion}
                                        updateQuestion={updateQuestion}
                                    />

                                    <FormFooter tabs={TABS} activeTab={activeTab} />
                                </div>
                            </FormProvider>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

