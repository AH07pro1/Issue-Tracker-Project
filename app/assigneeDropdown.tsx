'use client';
import React, { useState, useEffect } from 'react';

interface User {
    id: string;  // changed to string as userId in Prisma is a string (it should match the type in your schema)
    name: string;
}

interface AssigneeDropdownProps {
    onSelectUser: (userId: string | null) => void;  // callback function to pass the userId to the parent
}

function AssigneeDropdown({ onSelectUser }: AssigneeDropdownProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>("");

    useEffect(() => {
        // Fetch users from your backend API
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = e.target.value ? String(e.target.value) : null;
        setSelectedUser(userId || ""); // Update the selected user state
        onSelectUser(userId); // Pass the selected user ID to the parent
    };

    return (
        <div>
            <select
                className="select select-bordered w-full"
                value={selectedUser}
                onChange={handleChange}
            >
                <option value="">Select user</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default AssigneeDropdown;
