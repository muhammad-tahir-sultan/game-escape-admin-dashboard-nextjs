'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    options: Option[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    label?: string;
    placeholder?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function Select({
    options,
    value,
    defaultValue,
    onChange,
    name,
    placeholder = 'Select option...',
    className = '',
    size = 'md',
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val: string) => {
        setSelectedValue(val);
        setIsOpen(false);
        if (onChange) onChange(val);
    };

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm rounded-lg',
        md: 'px-4 py-3 text-base rounded-xl',
        lg: 'px-5 py-4 text-lg rounded-2xl',
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {/* Hidden input for form submission */}
            {name && <input type="hidden" name={name} value={selectedValue} />}

            <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between 
                    bg-[#1a1a20]/50 border border-white/10 text-white 
                    hover:bg-[#1a1a20]/80 hover:border-white/20 
                    focus:outline-none focus:ring-2 focus:ring-primary/50 
                    transition-all cursor-pointer group whitespace-nowrap overflow-hidden
                    ${sizeClasses[size]}
                `}
            >
                <span className={`truncate mr-2 ${selectedOption ? 'text-white' : 'text-gray-500'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                >
                    <ChevronDown className={`${iconSizes[size]} transition-colors ${isOpen ? 'text-primary' : 'text-gray-500 group-hover:text-gray-400'}`} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute z-[200] w-full mt-2 overflow-hidden rounded-xl bg-[#0f0f13] border border-white/10 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="p-1 max-h-60 overflow-y-auto custom-scrollbar">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`
                                        w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all
                                        ${selectedValue === option.value
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }
                                    `}
                                >
                                    <span className="truncate mr-2">{option.label}</span>
                                    {selectedValue === option.value && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="shrink-0"
                                        >
                                            <Check className="w-4 h-4" />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

