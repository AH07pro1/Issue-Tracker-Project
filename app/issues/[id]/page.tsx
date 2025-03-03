'use client';
import React, { useEffect, useState } from 'react';

interface Props {
    params: Promise<{ id: number }>;
}

const IssueDetails = ({ params }: Props) => {
    const [specificIssue, setSpecificIssue] = useState<any>(null);
    const [resolvedParams, setResolvedParams] = useState<{ id: number } | null>(null);

    useEffect(() => {
        const unwrapParams = async () => {
            const resolved = await params;
            setResolvedParams(resolved);
        };
        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (resolvedParams) {
            const getSpecificIssue = async () => {
                const response = await fetch(`/api/issues/${resolvedParams.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setSpecificIssue(data);
            };
            getSpecificIssue();
        }
    }, [resolvedParams]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-primary mb-6">Issue Details</h1>
            {specificIssue ? (
                <div className="space-y-4">
                    <div className="bg-base-200 p-4 rounded-lg">
                        <h2 className="text-xl font-bold">ID: {specificIssue.id}</h2>
                        <div className='mt-5'>
                        <p className="text-gray-600">Title: {specificIssue.title}</p>
                        <p className="text-gray-600">Description: {specificIssue.description}</p>
                        <p className="text-gray-600">Created At: {new Date(specificIssue.createdAt).toLocaleString()}</p>
                        </div>
                        
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}
        </div>
    );
};

export default IssueDetails;
