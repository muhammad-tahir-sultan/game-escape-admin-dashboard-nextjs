'use client';

interface MediaInfoProps {
    game?: any;
}

export default function MediaInfo({ game }: MediaInfoProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Thumbnail URL</label>
                <input
                    name="thumbnail"
                    type="url"
                    defaultValue={game?.thumbnail}
                    required
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
            </div>

            <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Images (URLs, comma separated)</label>
                <input
                    name="images"
                    defaultValue={game?.images?.join(', ') || ''}
                    placeholder="https://example.com/1.jpg, https://example.com/2.jpg"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
            </div>

            <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Tags (comma separated)</label>
                <input
                    name="tags"
                    defaultValue={game?.tags?.join(', ') || ''}
                    placeholder="mystery, horror, family"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
            </div>
        </div>
    );
}
