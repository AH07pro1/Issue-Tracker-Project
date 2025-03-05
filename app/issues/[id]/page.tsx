'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // for redirecting after deletion
import Modal from '@/app/Modal';
import AssigneeDropdown from './assigneeDropdown';

interface Props {
    params: Promise<{ id: number }>;
}

const statusOptions = ['OPEN', 'CLOSED', 'IN_PROGRESS']; // Enum values

const IssueDetails = ({ params }: Props) => {
    const [specificIssue, setSpecificIssue] = useState<any>(null);
    const [unwrappedParams, setUnwrappedParams] = useState<{ id: number } | null>(null);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal open state
    const router = useRouter(); // Used for redirecting after deletion

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setUnwrappedParams(resolvedParams);
        };
        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (unwrappedParams) {
            const getSpecificIssue = async () => {
                const response = await fetch(`http://localhost:3000/api/issues/${unwrappedParams.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                setSpecificIssue(data);
            };
            getSpecificIssue();
        }
    }, [unwrappedParams]);

    const handleEdit = (field: string, value: string) => {
        setEditingField(field);
        setEditedValue(value);
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
                title: field === "title" ? editedValue : specificIssue.title,
                status: field === "status" ? editedValue as "OPEN" | "IN_PROGRESS" | "CLOSED" : specificIssue.status,
                description: field === "description" ? editedValue : specificIssue.description
            }),
        });
    };

    const handleDelete = async () => {
        if (!specificIssue) return;

        // Send DELETE request to backend to remove the issue
        await fetch(`/api/issues/${specificIssue.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        router.push('/issues'); // Redirect after deletion
    };

    const openModal = () => setIsModalOpen(true); // Open modal function
    const closeModal = () => setIsModalOpen(false); // Close modal function

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
                                ) : (
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        value={editedValue}
                                        onChange={(e) => setEditedValue(e.target.value)}
                                    />
                                )
                            ) : (
                                field === 'assignedTo' ? (
                                    <AssigneeDropdown />
                                ) : (
                                    specificIssue[field]
                                )
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
                        <button className="btn btn-primary btn-sm" disabled>Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>

        {/* Delete Button */}
        <div className="mt-4 text-center">
            <button className="btn btn-error" onClick={openModal}>
                Delete Issue
            </button>
        </div>
    </div>
) : (
    <p className="text-center text-gray-500">Loading...</p>
)}

            {/* Modal for Confirmation */}
            {isModalOpen && (
               <Modal confirmationMessage='Are you sure you want to delete this issue?' warningMessage='This action cannot be undone.' cancelAction={closeModal} deleteAction={handleDelete}/>
            )}
        </div>
    );
};

export default IssueDetails;
