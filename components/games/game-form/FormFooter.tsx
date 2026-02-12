'use client';

import { CheckCircle2 } from 'lucide-react';

interface Tab {
    id: string;
}

interface FormFooterProps {
    tabs: Tab[];
    activeTab: string;
}

export default function FormFooter({ tabs, activeTab }: FormFooterProps) {
    return (
        <div className="h-14 shrink-0 bg-[#0f0f13] border-t border-white/5 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Auto-validation active
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Ready to Launch</span>
            </div>
            <div className="flex gap-1.5">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeTab === tab.id ? 'bg-primary w-4' : 'bg-white/10'}`}
                    />
                ))}
            </div>
        </div>
    );
}
