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
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Issues', href: '/issues' },
        { label: 'New', href: '/new-issue' },
        { label: 'About', href: '/about' },
    ];

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                {/* Bug Hunter title with responsive font size */}
                <a className="btn btn-ghost text-xl sm:text-2xl lg:text-3xl font-bold">Bug Hunter</a>
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
                            {/* Profile Picture with Outline */}
                            {session.user?.image && (
                                <div className="avatar w-8 h-8 rounded-full border-2 border-zinc-500 hover:border-zinc-800 cursor-pointer">
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
