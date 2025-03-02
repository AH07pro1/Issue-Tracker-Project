import Link from 'next/link';
import React from 'react';

const NavBar = () => {
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
        { label: 'About', href: '/about' },
    ];

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Issue Tracker</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="text-zinc-500 hover:text-zinc-900 transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
