"use client"
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Link from 'next/link'

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
                    <Link href="/dashboard">Dashboard</Link>
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
                        pathname === '/dashboard/upgrade' ? 'text-primary font-bold' : ''
                    }`}
                >
                    <Link href="/dashboard/upgrade">Upgrade</Link>
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                        pathname === '/how-it-works' ? 'text-primary font-bold' : ''
                    }`}
                >
                    <Link href="/dashboard/how-it-works">How it Works</Link>
                </li>
            </ul>
            <UserButton/>
        </div>
    )
}

export default Header
