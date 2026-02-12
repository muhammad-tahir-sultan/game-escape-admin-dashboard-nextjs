'use client';

import { Skeleton } from '../ui/Skeleton';

export function SidebarSkeleton() {
    return (
        <div className="w-72 h-screen glass-strong border-r border-white/10 p-6 flex flex-col gap-8 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/5 to-transparent shadow-inner" />
            </div>

            {/* Logo area */}
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-xl bg-white/10 text-transparent">.</Skeleton>
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-3/4 bg-white/10" />
                    <Skeleton className="h-3 w-1/2 bg-white/10" />
                </div>
            </div>

            {/* Nav Items */}
            <div className="flex-1 space-y-3 mt-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 opacity-50">
                        <Skeleton className="w-5 h-5 rounded-lg bg-white/10" />
                        <Skeleton className="h-4 w-24 bg-white/10" />
                    </div>
                ))}
            </div>

            {/* Logout */}
            <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/5 opacity-30">
                    <Skeleton className="w-5 h-5 rounded-lg bg-white/5" />
                    <Skeleton className="h-4 w-16 bg-white/5" />
                </div>
            </div>
        </div>
    );
}
