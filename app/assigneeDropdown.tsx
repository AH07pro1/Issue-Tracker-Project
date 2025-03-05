'use client'
import React, { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
}

interface AssigneeDropdownProps {
    onSelectUser: (userId: string | null) => void;
}

function AssigneeDropdown({ onSelectUser }: AssigneeDropdownProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>("");

    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = e.target.value ? String(e.target.value) : null;
        setSelectedUser(e.target.value);
        onSelectUser(userId); // Pass selected user ID to parent
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
