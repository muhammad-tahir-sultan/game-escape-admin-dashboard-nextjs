'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

        const variants = {
            primary: 'gradient-primary text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02]',
            secondary: 'glass text-foreground hover:glass-strong hover:scale-[1.02]',
            ghost: 'text-foreground hover:bg-white/5',
            danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/50',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                disabled={disabled || isLoading}
                {...(props as any)}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Loading...
                    </div>
                ) : children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
