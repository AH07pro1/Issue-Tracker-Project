import React, { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
}

function AssigneeDropdown() {
    const [users, setUsers] = useState([] as User[]);

    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <details className="dropdown">
            <summary className="btn m-1">Suggested for you</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {users.map(user => (
                    <li key={user.id} className="p-2 hover:bg-gray-200 cursor-pointer">
                        {user.name}
                    </li>
                ))}
            </ul>
        </details>
    );
}

export default AssigneeDropdown;
