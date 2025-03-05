import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    name: string;
    email: string;
    profilePic: string;
}

function ProfileTemplate({ name, email, profilePic }: Props) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
                <div className="text-center">
                    {/* Profile Picture */}
                    <div className="mb-6">
                        <img
                            src={profilePic}
                            alt={`${name}'s profile picture`}
                            width={120}
                            height={120}
                            className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500"
                        />
                    </div>
                    
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Profile</h1>
                    
                    <div className="mb-6">
                        <div className="text-lg font-medium text-gray-700">
                            <p>Name: <span className="font-normal text-gray-500">{name}</span></p>
                            <p>Email: <span className="font-normal text-gray-500">{email}</span></p>
                        </div>
                    </div>
                    
                    <Link className="btn btn-primary px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors" href='/api/auth/signout'>
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProfileTemplate;
