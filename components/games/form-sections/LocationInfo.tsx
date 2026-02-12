'use client';

interface LocationInfoProps {
    game?: any;
}

export default function LocationInfo({ game }: LocationInfoProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Place (Area Name)</label>
                    <input
                        name="place"
                        defaultValue={game?.place}
                        required
                        placeholder="e.g. Vienna Central"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Distance (Mission Path)</label>
                    <input
                        name="distance"
                        defaultValue={game?.distance}
                        required
                        placeholder="e.g. 2.4 km"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Main Mission Latitude</label>
                    <input
                        name="lat"
                        type="number"
                        step="any"
                        defaultValue={game?.lat || 0}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Main Mission Longitude</label>
                    <input
                        name="lng"
                        type="number"
                        step="any"
                        defaultValue={game?.lng || 0}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    />
                </div>
            </div>
        </div>
    );
}
