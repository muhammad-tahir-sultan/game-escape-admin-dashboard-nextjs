'use client';

import { useFormContext } from 'react-hook-form';
import Input from '@/components/ui/Input';

export default function LocationInfo() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Place (Area Name)</label>
                    <Input
                        {...register('place')}
                        placeholder="e.g. Vienna Central"
                        error={errors.place?.message as string}
                        className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                    />
                </div>
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Distance (Mission Path)</label>
                    <Input
                        {...register('distance')}
                        placeholder="e.g. 2.4 km"
                        error={errors.distance?.message as string}
                        className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Main Mission Latitude</label>
                    <Input
                        type="number"
                        step="any"
                        {...register('lat', { valueAsNumber: true })}
                        error={errors.lat?.message as string}
                        className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                    />
                </div>
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Main Mission Longitude</label>
                    <Input
                        type="number"
                        step="any"
                        {...register('lng', { valueAsNumber: true })}
                        error={errors.lng?.message as string}
                        className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
}
