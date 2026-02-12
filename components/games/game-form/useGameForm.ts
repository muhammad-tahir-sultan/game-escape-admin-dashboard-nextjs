'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { gameSchema, type GameInput, type QuestionInput } from '@/lib/validations';
import { createGame, updateGame } from '@/app/actions/games';

interface UseGameFormProps {
    game?: any;
    isOpen: boolean;
    onClose: () => void;
}

export function useGameForm({ game, isOpen, onClose }: UseGameFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [questions, setQuestions] = useState<QuestionInput[]>(game?.questions || []);
    const [activeTab, setActiveTab] = useState('general');
    const [showConfirmClose, setShowConfirmClose] = useState(false);
    const [isDirtyState, setIsDirtyState] = useState(false);

    const methods = useForm<any>({
        resolver: zodResolver(gameSchema),
        defaultValues: {
            title: game?.title || '',
            description: game?.description || '',
            difficulty: game?.difficulty || 'Medium',
            duration: game?.duration || 60,
            price: game?.price || 0,
            minPlayers: game?.minPlayers || 2,
            maxPlayers: game?.maxPlayers || 6,
            thumbnail: game?.thumbnail || '',
            images: game?.images || [],
            isActive: game?.isActive ?? true,
            tags: game?.tags || [],
            lat: game?.lat || 0,
            lng: game?.lng || 0,
            place: game?.place || '',
            distance: game?.distance || '',
            questions: game?.questions || [],
        }
    });

    const { reset, formState: { isDirty } } = methods;

    useEffect(() => {
        if (isOpen) {
            reset({
                title: game?.title || '',
                description: game?.description || '',
                difficulty: game?.difficulty || 'Medium',
                duration: game?.duration || 60,
                price: game?.price || 0,
                minPlayers: game?.minPlayers || 2,
                maxPlayers: game?.maxPlayers || 6,
                thumbnail: game?.thumbnail || '',
                images: game?.images || [],
                isActive: game?.isActive ?? true,
                tags: game?.tags || [],
                lat: game?.lat || 0,
                lng: game?.lng || 0,
                place: game?.place || '',
                distance: game?.distance || '',
                questions: (game?.questions as QuestionInput[]) || [],
            });
            setQuestions(game?.questions || []);
            setIsDirtyState(false);
        }
    }, [isOpen, game, reset]);

    const handleAttemptClose = () => {
        if (!isDirty && !isDirtyState) {
            onClose();
        } else {
            setShowConfirmClose(true);
        }
    };

    const handleConfirmDiscard = () => {
        setIsDirtyState(false);
        setShowConfirmClose(false);
        onClose();
    };

    const addQuestion = () => {
        const newQuestion: QuestionInput = {
            name: `Objective #${questions.length + 1}`,
            text: '',
            riddle: '',
            intro: '',
            index: questions.length,
            lat: game?.lat || 0,
            lng: game?.lng || 0,
            questionType: 'textChoices',
            options: [],
            rightAnswer: '',
            rightAnswerImage: '',
            questionHint: '',
            mapImage: '',
            images: [],
            hints: [],
            explanation: { text: '', images: [], info: '', infoExplanation: '' }
        };
        setQuestions([...questions, newQuestion]);
        setIsDirtyState(true);
    };

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index).map((q, i) => ({ ...q, index: i })));
        setIsDirtyState(true);
    };

    const updateQuestion = (index: number, field: string, value: any) => {
        const updated = [...questions];
        updated[index] = { ...updated[index], [field]: value } as QuestionInput;
        setQuestions(updated);
        setIsDirtyState(true);
    };

    const onSubmit = async (formData: any) => {
        const data = formData as GameInput;
        setIsLoading(true);
        setError('');

        try {
            const fd = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    fd.set(key, JSON.stringify(value));
                } else {
                    fd.set(key, String(value));
                }
            });
            fd.set('questions', JSON.stringify(questions));

            const result = game
                ? await updateGame(game._id, fd)
                : await createGame(fd);

            if (result.error) {
                setError(result.error);
                toast.error(result.error);
            } else {
                toast.success(game ? 'Mission upgraded successfully! 🚀' : 'New adventure created! ✨');
                router.refresh();
                onClose();
            }
        } catch (err) {
            console.error('Submission error:', err);
            setError('An unexpected error occurred. Please try again.');
            toast.error('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        methods,
        isLoading,
        error,
        questions,
        activeTab,
        setActiveTab,
        showConfirmClose,
        setShowConfirmClose,
        isDirtyState,
        setIsDirtyState,
        handleAttemptClose,
        handleConfirmDiscard,
        addQuestion,
        removeQuestion,
        updateQuestion,
        onSubmit,
    };
}
