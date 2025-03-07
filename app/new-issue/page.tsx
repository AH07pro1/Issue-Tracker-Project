'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import SelectStatusDropdown from './selectStatusDropdown';
import AssigneeDropdown from '../assigneeDropdown';
import { useAppContext } from '@/context';
import { useSession } from 'next-auth/react';
import IssueForm from './IssueForm';

const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title cannot be longer than 255 characters'),
    description: z.string().min(1, 'Description is required'),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED'], { message: 'Invalid status' }),
    assignedToUserId: z.number().nullable().optional(), // Allow null if no assignee selected
});

const NewIssue = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [assignedToUserId, setAssignedToUserId] = useState<string | null>(null); // Store selected user ID
    const { status, data: session } = useSession();

     useEffect(() => {
        if (!session) {
          redirect('/api/auth/signin');
        } 
      }, [session]);
  
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(createIssueSchema),
        defaultValues: { status: 'OPEN' },
    });

    const handleCleanUp = () => {
        reset();
        setAssignedToUserId(null);
    };

    const onSubmit = async (data: any) => {
        console.log("Submitting issue:", data);
        setIsLoading(true);

        const requestData = { ...data, assignedToUserId, createdByUserId: session?.user.id, createdByUserName: session?.user.name};
        console.log("requestedData", requestData);

        try {
            const response = await fetch('/api/issues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'title':requestData.title,
                    'description': requestData.description,
                    'status': requestData.status,
                    'createdByUserId': requestData.createdByUserId,
                    'assignedToUserId': requestData.assignedToUserId,
                    'createdByUserName': requestData.createdByUserName
                }),
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
        <IssueForm 
        register={register}
        errors={errors}
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
        assignedToUserId={assignedToUserId}
        setAssignedToUserId={setAssignedToUserId}
      />
    );
};

export default NewIssue;
