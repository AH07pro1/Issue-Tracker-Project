'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { redirect } from  'next/navigation'

const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title cannot be longer than 255 characters'),
    description: z.string().min(1, 'Description is required'),
});

const NewIssue = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(createIssueSchema),
    });

    const handleCleanUp = () => {
        reset();
    };

    const onSubmit = async (data: any) => {
        console.log("Submitting issue:", data);
        setIsLoading(true);

        try {
            const response = await fetch('/api/issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result);
            handleCleanUp();
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
            alert('Issue submitted successfully!');
            redirect('/issues');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-primary">New Issue</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                <input 
                    type="text" 
                    placeholder="Issue title" 
                    className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                    {...register('title')}
                />
                {errors.title && <span className="text-error text-sm">{errors.title.message}</span>}

                <textarea 
                    placeholder="Issue description" 
                    rows={3} 
                    className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
                    {...register('description')}
                />
                {errors.description && <span className="text-error text-sm">{errors.description.message}</span>}

                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        'Submit Issue'
                    )}
                </button>
            </form>
        </div>
    );
};

export default NewIssue;
