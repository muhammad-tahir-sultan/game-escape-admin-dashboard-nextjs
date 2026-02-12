'use client';

import { useFormContext, Controller } from 'react-hook-form';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';

const difficultyOptions = [
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' },
    { label: 'Expert', value: 'Expert' },
];

export default function BasicInfo() {
    const { register, control, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-4">
            <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Title</label>
                <Input
                    {...register('title')}
                    placeholder="e.g. The Haunted Mansion"
                    error={errors.title?.message as string}
                    className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                />
            </div>

            <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Description</label>
                <textarea
                    {...register('description')}
                    rows={4}
                    placeholder="Describe the mission..."
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none ${errors.description ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message as string}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 ">Difficulty</label>
                    <Controller
                        name="difficulty"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onChange={field.onChange}
                                options={difficultyOptions}
                            />
                        )}
                    />
                    {errors.difficulty && <p className="text-xs text-red-500 mt-1">{errors.difficulty.message as string}</p>}
                </div>

                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Duration (min)</label>
                    <Input
                        type="number"
                        {...register('duration', { valueAsNumber: true })}
                        placeholder="60"
                        error={errors.duration?.message as string}
                        className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Price ($)</label>
                    <Input
                        type="number"
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                        error={errors.price?.message as string}
                        className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                    />
                </div>

                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Min Players</label>
                    <Input
                        type="number"
                        {...register('minPlayers', { valueAsNumber: true })}
                        error={errors.minPlayers?.message as string}
                        className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                    />
                </div>

                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Max Players</label>
                    <Input
                        type="number"
                        {...register('maxPlayers', { valueAsNumber: true })}
                        error={errors.maxPlayers?.message as string}
                        className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
}
