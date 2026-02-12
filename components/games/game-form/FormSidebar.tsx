'use client';

import { motion } from 'framer-motion';
import { Save, LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Tab {
    id: string;
    label: string;
    icon: LucideIcon;
    color: string;
}

interface FormSidebarProps {
    tabs: Tab[];
    activeTab: string;
    setActiveTab: (id: string) => void;
    game: any;
    isLoading: boolean;
    onDiscard: () => void;
}

export default function FormSidebar({ tabs, activeTab, setActiveTab, game, isLoading, onDiscard }: FormSidebarProps) {
    return (
        <div className="w-1/4 min-w-[240px] bg-[#0f0f13] border-r border-white/5 p-8 flex flex-col justify-between">
            <div className="space-y-8">
                <div>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        {game ? 'Refine Mission' : 'New Mission'}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-semibold opacity-50">
                        Mission Builder
                    </p>
                </div>

                <nav className="space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
                                    ${isActive
                                        ? 'bg-white/10 text-white shadow-xl shadow-black/20'
                                        : 'text-muted-foreground hover:bg-white/5 hover:text-white/80'
                                    }
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabGlow"
                                        className="absolute inset-0 bg-primary/5 rounded-xl border border-primary/20 pointer-events-none"
                                    />
                                )}
                                <Icon className={`w-5 h-5 shrink-0 relative z-10 ${isActive ? tab.color : 'opacity-50 group-hover:opacity-100 transition-opacity'}`} />
                                <span className="font-medium text-sm relative z-10">{tab.label}</span>
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="ml-auto relative z-10"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#8b5cf6]" />
                                    </motion.div>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="space-y-6">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <div className="space-y-0.5">
                            <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors inline-flex items-center gap-2">
                                Status
                            </span>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Visibility Control</p>
                        </div>
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="isActive"
                                form="mission-form"
                                defaultChecked={game?.isActive ?? true}
                                className="peer sr-only"
                            />
                            <div className="w-11 h-6 bg-white/5 border border-white/10 rounded-full peer peer-checked:bg-primary/20 peer-checked:border-primary/50 transition-all duration-300"></div>
                            <div className="absolute top-1 left-1 bg-white/40 w-4 h-4 rounded-full shadow-lg transform transition-transform duration-300 peer-checked:translate-x-5 peer-checked:bg-primary"></div>
                        </div>
                    </label>
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        form="mission-form"
                        type="submit"
                        variant="primary"
                        className="w-full py-2.5 rounded-xl shadow-[0_10px_20px_rgba(139,92,246,0.1)] hover:shadow-[0_12px_22px_rgba(139,92,246,0.2)] transition-all cursor-pointer font-bold text-sm"
                        isLoading={isLoading}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {game ? 'Update' : 'Launch'}
                    </Button>
                    <button
                        type="button"
                        onClick={onDiscard}
                        className="w-full py-2.5 text-sm font-bold text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5 rounded-xl transition-all cursor-pointer"
                    >
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
