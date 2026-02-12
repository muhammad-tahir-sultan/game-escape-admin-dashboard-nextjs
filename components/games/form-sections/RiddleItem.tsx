'use client';

import { Trash2, GripVertical, Target, MessageSquare, HelpCircle, MapPin } from 'lucide-react';
import Select from '@/components/ui/Select';

interface RiddleItemProps {
    q: any;
    index: number;
    onUpdate: (index: number, field: string, value: any) => void;
    onRemove: (index: number) => void;
}

const interactionOptions = [
    { label: 'Multiple Choice (Text)', value: 'textChoices' },
    { label: 'Free Text Input', value: 'textField' },
    { label: 'Multiple Choice (Images)', value: 'imageChoices' },
];

export default function RiddleItem({ q, index, onUpdate, onRemove }: RiddleItemProps) {
    return (
        <div className="group relative bg-[#0f0f13] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl">
            {/* Header / Grab Handle Area */}
            <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/10 rounded transition-colors">
                        <GripVertical className="w-4 h-4 text-white/20" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[10px] font-black text-emerald-400 border border-emerald-500/20">
                            {index + 1}
                        </div>
                        <input
                            className="bg-transparent border-none text-white font-bold text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/30 px-2 py-0.5 rounded transition-all placeholder:text-white/20"
                            value={q.name}
                            placeholder="Objective Name..."
                            onChange={(e) => onUpdate(index, 'name', e.target.value)}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all duration-200 cursor-pointer"
                    title="Remove Objective"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <MessageSquare className="w-3 h-3 text-emerald-500/50" />
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Intro (The Story)</label>
                        </div>
                        <textarea
                            rows={3}
                            placeholder="Set the atmosphere for this specific objective..."
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all resize-none placeholder:text-white/10"
                            value={q.intro}
                            onChange={(e) => onUpdate(index, 'intro', e.target.value)}
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Target className="w-3 h-3 text-emerald-500/50" />
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Task (Instruction)</label>
                        </div>
                        <textarea
                            rows={3}
                            placeholder="What exactly should the players do here?"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all resize-none placeholder:text-white/10"
                            value={q.text}
                            onChange={(e) => onUpdate(index, 'text', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <HelpCircle className="w-3 h-3 text-emerald-500/50" />
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">The Enigma</label>
                        </div>
                        <textarea
                            rows={2}
                            placeholder="Enter the actual riddle or puzzle question..."
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all resize-none placeholder:text-white/10"
                            value={q.riddle}
                            onChange={(e) => onUpdate(index, 'riddle', e.target.value)}
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Target className="w-3 h-3 text-emerald-500/50" />
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Valid Solution</label>
                        </div>
                        <input
                            placeholder="Enter the expected answer code..."
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all placeholder:text-white/10"
                            value={q.rightAnswer}
                            onChange={(e) => onUpdate(index, 'rightAnswer', e.target.value)}
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-3 h-3 text-emerald-500/50" />
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Interaction & Geolocation</label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Select
                                value={q.questionType}
                                onChange={(val) => onUpdate(index, 'questionType', val)}
                                options={interactionOptions}
                                size="md"
                            />
                        </div>
                        <div className="space-y-2">
                            <input
                                type="number"
                                step="any"
                                placeholder="Latitude"
                                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all placeholder:text-white/20"
                                value={q.lat}
                                onChange={(e) => onUpdate(index, 'lat', parseFloat(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <input
                                type="number"
                                step="any"
                                placeholder="Longitude"
                                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all placeholder:text-white/20"
                                value={q.lng}
                                onChange={(e) => onUpdate(index, 'lng', parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
