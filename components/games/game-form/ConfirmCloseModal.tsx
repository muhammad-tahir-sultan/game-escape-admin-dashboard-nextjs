'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ConfirmCloseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmCloseModal({ isOpen, onClose, onConfirm }: ConfirmCloseModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[150] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
                    onClick={(e) => e.stopPropagation()}
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
                                onClick={onConfirm}
                            >
                                Yes, Discard
                            </Button>
                            <button
                                onClick={onClose}
                                className="w-full py-3 text-sm font-semibold text-white/50 hover:text-white transition-colors cursor-pointer"
                            >
                                Continue Editing
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
