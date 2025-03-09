'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import ProfileTemplate from './profileTemplate';

const Page = () => {
    const { data: session } = useSession();

    if (!session || !session.user) {
        return <div>Loading...</div>; // Or a proper "Not logged in" UI
    }

    return (
        <div>
            <ProfileTemplate
                name={session.user.name ?? 'Guest'}
                email={session.user.email ?? 'No email available'}
                profilePic={session.user.image ?? '/default-profile.png'}
            />
        </div>
    );
};

export default Page;
