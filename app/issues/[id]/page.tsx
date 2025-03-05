'use client';
import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/app/Modal';
import AssigneeDropdown from '../../assigneeDropdown';

interface Props {
    params: Promise<{ id: number }>; // `params` is now a Promise
}

interface User {
    name: string;
}

const statusOptions = ['OPEN', 'CLOSED', 'IN_PROGRESS'];

const IssueDetails = ({ params }: Props) => {
    const unwrappedParams = use(params); // ✅ Unwrap the `params` Promise
    const [specificIssue, setSpecificIssue] = useState<any>(null);
    const [assignedToUser, setAssignedToUser] = useState<User | null>(null);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const getSpecificIssue = async () => {
            try {
                const response = await fetch(`/api/issues/${unwrappedParams.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch issue');
                }

                const data = await response.json();
                setSpecificIssue(data);
            } catch (error) {
                console.error('Error fetching issue:', error);
            }
        };

        if (unwrappedParams.id) {
            getSpecificIssue();
        }
    }, [unwrappedParams.id]);

    useEffect(() => {
        const getAssignedToUser = async () => {
            if (!specificIssue || !specificIssue.assignedToUserId) return;

            try {
                const response = await fetch(`/api/users/${specificIssue.assignedToUserId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch assigned user');
                }

                const data = await response.json();
                setAssignedToUser(data);
            } catch (error) {
                console.error('Error fetching assigned user:', error);
            }
        };

        getAssignedToUser();
    }, [specificIssue]); // Runs only after `specificIssue` is set

    const handleEdit = (field: string, value: string) => {
        setEditingField(field);
        setEditedValue(value); // Set the current value (or user) when editing assignedTo
    };
    
    const handleSelectUser = (userId: string | null) => {
        
        setEditedValue(userId || ""); // Update the selected user ID when the dropdown value changes
    };

    const handleSave = async (field: string) => {
        if (!specificIssue) return;

        const updatedIssue = { ...specificIssue, [field]: editedValue };
        setSpecificIssue(updatedIssue);
        setEditingField(null);

        await fetch(`/api/issues/${specificIssue.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: field === 'title' ? editedValue : specificIssue.title,
                status: field === 'status' ? (editedValue as 'OPEN' | 'IN_PROGRESS' | 'CLOSED') : specificIssue.status,
                description: field === 'description' ? editedValue : specificIssue.description,
                assignedToUserId: field === 'assignedTo' ? (editedValue ? editedValue : null) : specificIssue.assignedToUserId, // Update assigned user
            }),
        });
    };

    const handleDelete = async () => {
        if (!specificIssue) return;

        await fetch(`/api/issues/${specificIssue.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        router.push('/issues');
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-primary mb-6 text-center">Issue Details</h1>
            {specificIssue ? (
                <div className="bg-base-200 p-6 rounded-lg">
                    <table className="table-auto w-full">
                        <tbody>
                            {['title', 'status', 'assignedTo', 'description'].map((field) => (
                                <tr key={field} className="border-b border-gray-300">
                                    <td className="font-bold p-3 capitalize">{field}:</td>
                                    <td className="p-3">
                                        {editingField === field ? (
                                            field === 'status' ? (
                                                <select
                                                    className="select select-bordered w-full"
                                                    value={editedValue}
                                                    onChange={(e) => setEditedValue(e.target.value)}
                                                >
                                                    {statusOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : field === 'assignedTo' ? (
                                                <AssigneeDropdown onSelectUser={handleSelectUser} />
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="input input-bordered w-full"
                                                    value={editedValue}
                                                    onChange={(e) => setEditedValue(e.target.value)}
                                                />
                                            )
                                        ) : field === 'assignedTo' ? (
                                            <h1>{assignedToUser ? assignedToUser.name : 'Unassigned'}</h1>
                                        ) : (
                                            specificIssue[field]
                                        )}
                                    </td>
                                    <td className="p-3">
                                        {editingField === field ? (
                                            <button className="btn btn-success btn-sm" onClick={() => handleSave(field)}>
                                                Save
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(field, specificIssue[field])}>
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className="font-bold p-3">Created At:</td>
                                <td className="p-3">{new Date(specificIssue.createdAt).toLocaleString()}</td>
                                <td className="p-3">
                                    <button className="btn btn-primary btn-sm" disabled>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-4 text-center">
                        <button className="btn btn-error" onClick={openModal}>
                            Delete Issue
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}

            {isModalOpen && (
                <Modal confirmationMessage="Are you sure you want to delete this issue?" warningMessage="This action cannot be undone." cancelAction={closeModal} deleteAction={handleDelete} />
            )}
        </div>
    );
};

export default IssueDetails;
