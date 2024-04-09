'use client'

import { logout } from '@/app/(auth)/_auth/logout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

const Header = () => {
    const { data, status } = useSession();
    const onClick = () => {
        logout();
    };

    return (
        <nav className='flex justify-between'>
            <Link href={'/'}>Home</Link>
            <div>
                {
                    status == 'authenticated' ? <div className='flex items-center gap-3'>
                        <Link href={'/dashboard/user-profile'}>Profile</Link>
                        <button onClick={onClick} className=''>logout</button>
                    </div>
                        :
                        <div className='flex items-center gap-3'>
                            <Link href={'/login'}>Login</Link>
                            <Link href={'/register'}>Register</Link>
                        </div>
                }
            </div>
        </nav>
    )
}

export default Header