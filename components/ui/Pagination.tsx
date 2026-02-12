'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export default function Pagination({ currentPage, totalPages, onPageChange, isLoading }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handlePrev = () => currentPage > 1 && onPageChange(currentPage - 1);
    const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <div className="flex items-center gap-1.5 p-1.5 glass rounded-2xl border border-white/5 shadow-2xl">
                {/* First Page */}
                <NavButton
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1 || isLoading}
                    icon={ChevronsLeft}
                />

                {/* Prev */}
                <NavButton
                    onClick={handlePrev}
                    disabled={currentPage === 1 || isLoading}
                    icon={ChevronLeft}
                />

                <div className="flex items-center mx-1">
                    {getPageNumbers().map((page) => (
                        <PageButton
                            key={page}
                            page={page}
                            isActive={page === currentPage}
                            onClick={() => onPageChange(page)}
                            disabled={isLoading}
                        />
                    ))}
                </div>

                {/* Next */}
                <NavButton
                    onClick={handleNext}
                    disabled={currentPage === totalPages || isLoading}
                    icon={ChevronRight}
                />

                {/* Last Page */}
                <NavButton
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages || isLoading}
                    icon={ChevronsRight}
                />
            </div>
        </div>
    );
}

function NavButton({ onClick, disabled, icon: Icon }: any) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                p-2 rounded-xl transition-all duration-300
                ${disabled
                    ? 'text-white/10 cursor-not-allowed'
                    : 'text-white/40 hover:text-white hover:bg-white/5 cursor-pointer active:scale-90'
                }
            `}
        >
            <Icon className="w-4 h-4" />
        </button>
    );
}

function PageButton({ page, isActive, onClick, disabled }: any) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="relative px-3.5 py-1.5 group cursor-pointer"
        >
            {isActive && (
                <motion.div
                    layoutId="activePage"
                    className="absolute inset-x-1 inset-y-0.5 bg-primary/20 border border-primary/30 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className={`
                relative z-10 text-sm font-bold transition-all duration-300
                ${isActive ? 'text-white scale-110' : 'text-white/30 hover:text-white/60'}
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
            `}>
                {page}
            </span>
        </button>
    );
}
