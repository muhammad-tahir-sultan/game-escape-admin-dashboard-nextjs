'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    variant?: 'danger' | 'warning' | 'primary';
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false,
    variant = 'danger'
}: ConfirmDialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
                    />

                    {/* Dialog Container */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="pointer-events-auto w-full max-w-md rounded-2xl bg-[#0f0f13] border border-white/10 shadow-2xl overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl bg-${variant === 'danger' ? 'red' : variant === 'warning' ? 'orange' : 'primary'}-500/10 border border-${variant === 'danger' ? 'red' : variant === 'warning' ? 'orange' : 'primary'}-500/20`}>
                                        <AlertTriangle className={`w-6 h-6 text-${variant === 'danger' ? 'red' : variant === 'warning' ? 'orange' : 'primary'}-400`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white">{title}</h3>
                                            <button
                                                onClick={onClose}
                                                className="p-1 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors cursor-pointer"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={onClose}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 font-medium transition-all cursor-pointer"
                                    >
                                        {cancelText}
                                    </button>
                                    <Button
                                        variant={variant === 'danger' ? 'danger' : 'primary'}
                                        onClick={onConfirm}
                                        isLoading={isLoading}
                                        className="flex-1 py-2.5 rounded-xl h-auto cursor-pointer"
                                    >
                                        {confirmText}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
