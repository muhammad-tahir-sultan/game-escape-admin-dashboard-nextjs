'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { loginAction } from '@/app/actions/auth';
import { loginSchema, type LoginInput } from '@/lib/validations';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true);
        setServerError('');

        const result = await loginAction(data.email, data.password);

        if (result.error) {
            setServerError(result.error);
            setIsLoading(false);
        } else {
            // Force a hard navigation to ensure middleware runs
            window.location.href = '/dashboard';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass-strong rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4"
                        >
                            <LogIn className="w-8 h-8 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-gradient mb-2">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to your admin dashboard</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {(serverError || errors.email || errors.password) && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm"
                            >
                                {serverError || errors.email?.message || errors.password?.message}
                            </motion.div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-3 top-[38px] w-5 h-5 text-muted-foreground" />
                            <Input
                                label="Email"
                                type="email"
                                {...register('email')}
                                error={errors.email?.message}
                                placeholder="admin@example.com"
                                className="pl-11"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-[38px] w-5 h-5 text-muted-foreground" />
                            <Input
                                label="Password"
                                type="password"
                                {...register('password')}
                                error={errors.password?.message}
                                placeholder="••••••••"
                                className="pl-11"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full cursor-pointer"
                            isLoading={isLoading}
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary hover:text-accent transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
