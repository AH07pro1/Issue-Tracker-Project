'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
        { label: 'New', href: '/new-issue' },
        { label: 'About', href: '/about' },
    ];

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Issue Tracker</a>
            </div>
            <div className="flex-none ml-auto flex items-center space-x-4">
                <ul className="menu menu-horizontal px-1 inline-flex space-x-4">
                    {links.map((link) => (
                        <li key={link.href} className="mr-4">
                            <Link 
                                href={link.href} 
                                className={`text-zinc-500 hover:text-zinc-900 transition-colors ${currentPath === link.href ? 'font-bold text-zinc-900' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center space-x-4">
                    {status === 'authenticated' ? (
                        <div className="flex items-center space-x-2">
                            {/* Profile Picture */}
                            {session.user?.image && (
                                <div className="avatar w-8 h-8  rounded-full">
                                    <img
                                        src={session.user!.image!} 
                                        onClick={() => redirect('/profile')}
                                        alt="Profile Picture" 
                                        width={40} 
                                        height={40}
                                        className="rounded-full" 
                                    />
                                </div>
                            )}
                            
                        </div>
                    ) : (
                        <Link href="/api/auth/signin" className="btn btn-primary">
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
