'use client';

import { useFormContext, Controller } from 'react-hook-form';
import Input from '@/components/ui/Input';

export default function MediaInfo() {
    const { register, control, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-6">
            <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Thumbnail URL</label>
                <Input
                    {...register('thumbnail')}
                    type="url"
                    placeholder="https://..."
                    error={errors.thumbnail?.message as string}
                    className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                />
            </div>

            <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Images (URLs, comma separated)</label>
                <Controller
                    name="images"
                    control={control}
                    render={({ field }) => (
                        <Input
                            value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                            onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val.split(',').map(s => s.trim()).filter(Boolean));
                            }}
                            placeholder="https://example.com/1.jpg, https://example.com/2.jpg"
                            error={errors.images?.message as string}
                            className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                        />
                    )}
                />
            </div>

            <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Tags (comma separated)</label>
                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <Input
                            value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                            onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val.split(',').map(s => s.trim()).filter(Boolean));
                            }}
                            placeholder="mystery, horror, family"
                            error={errors.tags?.message as string}
                            className="!bg-white/5 !border-white/10 !text-white !py-3 !rounded-xl"
                        />
                    )}
                />
            </div>
        </div>
    );
}
