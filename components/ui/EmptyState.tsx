'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Plus } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
    icon?: React.ElementType;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export default function EmptyState({
    icon: Icon = HelpCircle,
    title,
    description,
    actionLabel,
    onAction,
    className = '',
}: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col items-center justify-center py-12 px-6 text-center rounded-2xl bg-white/5 border border-dashed border-white/10 ${className}`}
        >
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-white/10 shadow-xl">
                    <Icon className="w-8 h-8 text-white" />
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm max-w-xs mb-8">
                {description}
            </p>

            {actionLabel && onAction && (
                <Button
                    variant="primary"
                    onClick={onAction}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20"
                >
                    <Plus className="w-4 h-4" />
                    {actionLabel}
                </Button>
            )}
        </motion.div>
    );
}
