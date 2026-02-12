import { Skeleton } from '@/components/ui/Skeleton';

export default function DashboardLoading() {
    return (
        <div className="space-y-8 p-6">
            {/* Welcome Header */}
            <Skeleton className="h-48 w-full p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            </Skeleton>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24 bg-white/10" />
                                <Skeleton className="h-8 w-16 bg-white/10" />
                            </div>
                            <Skeleton className="h-10 w-10 rounded-xl bg-white/10" />
                        </div>
                    </Skeleton>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Games */}
                <Skeleton className="lg:col-span-2 h-[400px] p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-4">
                        <Skeleton className="h-6 w-32 bg-white/10" />
                        <Skeleton className="h-4 w-16 bg-white/10" />
                    </div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-xl bg-white/10" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-48 bg-white/10" />
                                <Skeleton className="h-3 w-32 bg-white/10" />
                            </div>
                            <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
                        </div>
                    ))}
                </Skeleton>

                {/* Quick Stats */}
                <Skeleton className="h-[400px] p-6 flex flex-col gap-6">
                    <Skeleton className="h-6 w-40 bg-white/10 mb-2" />

                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-24 bg-white/10" />
                                <Skeleton className="h-4 w-8 bg-white/10" />
                            </div>
                            <Skeleton className="h-2 w-full rounded-full bg-white/10" />
                        </div>
                    ))}

                    <div className="mt-auto p-4 rounded-xl border border-white/5 bg-white/5">
                        <Skeleton className="h-4 w-32 bg-white/10 mb-2" />
                        <Skeleton className="h-8 w-24 bg-white/10" />
                    </div>
                </Skeleton>
            </div>
        </div>
    );
}
