'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ListTodo, Sparkles, PlusCircle } from 'lucide-react';
import RiddleItem from './RiddleItem';

interface RiddleManagerProps {
    questions: any[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onUpdate: (index: number, field: string, value: any) => void;
}

export default function RiddleManager({ questions, onAdd, onRemove, onUpdate }: RiddleManagerProps) {
    return (
        <div className="space-y-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <ListTodo className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-2xl font-bold text-white tracking-tight">Mission Objectives</h3>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">Design the challenges and enigmas for your players</p>
                </div>
                <button
                    type="button"
                    onClick={onAdd}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all duration-300 text-sm font-bold cursor-pointer shadow-lg shadow-emerald-500/5"
                >
                    <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    New Objective
                </button>
            </div>

            <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                    {questions.map((q, qIndex) => (
                        <motion.div
                            key={qIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: qIndex * 0.05 }}
                        >
                            <RiddleItem
                                q={q}
                                index={qIndex}
                                onUpdate={onUpdate}
                                onRemove={onRemove}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {questions.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group cursor-pointer"
                        onClick={onAdd}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex flex-col items-center justify-center py-16 px-8 rounded-3xl bg-[#0f0f13] border border-white/5 border-dashed border-2 group-hover:border-emerald-500/50 transition-all duration-300">
                            <div className="w-20 h-20 rounded-2xl bg-emerald-500/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                <Sparkles className="w-10 h-10 text-emerald-500/40" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">No Challenges Yet</h4>
                            <p className="text-muted-foreground text-sm text-center max-w-xs mb-8">
                                Every legendary mission starts with a first enigma. Click to begin crafting your story.
                            </p>
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                                <Plus className="w-4 h-4" />
                                Create First Enigma
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Hidden input to store stringified questions for FormData */}
            <input type="hidden" name="questions" value={JSON.stringify(questions)} />
        </div>
    );
}

