'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
            className={`
        glass-strong rounded-xl p-6
        ${hover ? 'hover:shadow-xl hover:shadow-purple-500/10' : ''}
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
}
