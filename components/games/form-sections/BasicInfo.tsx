'use client';

import Select from '@/components/ui/Select';

interface BasicInfoProps {
    game?: any;
}

const difficultyOptions = [
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' },
    { label: 'Expert', value: 'Expert' },
];

export default function BasicInfo({ game }: BasicInfoProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Title</label>
                <input
                    name="title"
                    defaultValue={game?.title}
                    required
                    placeholder="e.g. The Haunted Mansion"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
            </div>

            <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Description</label>
                <textarea
                    name="description"
                    defaultValue={game?.description}
                    required
                    rows={4}
                    placeholder="Describe the mission..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 ">Difficulty</label>
                    <Select
                        name="difficulty"
                        defaultValue={game?.difficulty || 'Medium'}
                        options={difficultyOptions}
                    />
                </div>

                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Duration (min)</label>
                    <input
                        name="duration"
                        type="number"
                        defaultValue={game?.duration || 60}
                        required
                        min={15}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Price ($)</label>
                    <input
                        name="price"
                        type="number"
                        defaultValue={game?.price || 0}
                        required
                        min={0}
                        step="0.01"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    />
                </div>

                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Min Players</label>
                    <input
                        name="minPlayers"
                        type="number"
                        defaultValue={game?.minPlayers || 2}
                        required
                        min={1}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    />
                </div>

                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Max Players</label>
                    <input
                        name="maxPlayers"
                        type="number"
                        defaultValue={game?.maxPlayers || 6}
                        required
                        min={1}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    />
                </div>
            </div>
        </div>
    );
}
