'use client';

import { X, Gamepad2 } from 'lucide-react';

interface FormHeaderProps {
    onClose: () => void;
}

export default function FormHeader({ onClose }: FormHeaderProps) {
    return (
        <div className="h-20 shrink-0 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0a0c]/80 backdrop-blur-xl z-20">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-white/10 shadow-lg">
                    <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-white">Mission Configuration</h3>
                    <p className="text-xs text-muted-foreground">Modify objectives and environmental parameters</p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-white transition-all cursor-pointer group"
            >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
        </div>
    );
}
