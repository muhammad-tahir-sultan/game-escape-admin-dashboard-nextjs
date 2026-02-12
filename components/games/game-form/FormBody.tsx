'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import BasicInfo from '../form-sections/BasicInfo';
import LocationInfo from '../form-sections/LocationInfo';
import MediaInfo from '../form-sections/MediaInfo';
import RiddleManager from '../form-sections/RiddleManager';
import { QuestionInput } from '@/lib/validations';

interface FormBodyProps {
    activeTab: string;
    error: string;
    questions: QuestionInput[];
    onSubmit: (data: any) => void;
    setIsDirtyState: (isDirty: boolean) => void;
    addQuestion: () => void;
    removeQuestion: (index: number) => void;
    updateQuestion: (index: number, field: string, value: any) => void;
}

export default function FormBody({
    activeTab,
    error,
    questions,
    onSubmit,
    setIsDirtyState,
    addQuestion,
    removeQuestion,
    updateQuestion,
}: FormBodyProps) {
    const { handleSubmit, formState: { errors } } = useFormContext();

    const renderTabContent = () => {
        const sections: Record<string, { title: string; component: React.ReactNode }> = {
            general: { title: 'General Information', component: <BasicInfo /> },
            location: { title: 'Mission Location', component: <LocationInfo /> },
            media: { title: 'Media Assets & Tags', component: <MediaInfo /> },
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
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <form
                id="mission-form"
                onSubmit={handleSubmit(onSubmit)}
                onInput={() => setIsDirtyState(true)}
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

                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                        <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Validation Errors</p>
                        <ul className="list-disc list-inside text-red-300/70 text-sm space-y-1">
                            {Object.entries(errors).map(([key, err]: [string, any]) => (
                                <li key={key}>{key}: {err?.message}</li>
                            ))}
                        </ul>
                    </div>
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
    );
}
