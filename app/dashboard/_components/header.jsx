"use client"
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const pathname = usePathname();
    useEffect(() => {
        console.log(pathname);
    }, [pathname]);
    return (
        <div className="flex p-4 items-center justify-between bg-secondary shadow-xs">
            <img src={"/logo.svg"} width={160} height={160} alt="logo" />
            <ul className='hidden md:flex gap-6'>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                        pathname === '/dashboard' ? 'text-primary font-bold' : ''
                    }`}
                >
                    Dashboard
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                        pathname === '/questions' ? 'text-primary font-bold' : ''
                    }`}
                >
                    Questions
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                        pathname === '/upgrade' ? 'text-primary font-bold' : ''
                    }`}
                >
                    Upgrade
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                        pathname === '/how-it-works' ? 'text-primary font-bold' : ''
                    }`}
                >
                    How it Works
                </li>
            </ul>
            <UserButton/>
        </div>
    )
}

export default Header
