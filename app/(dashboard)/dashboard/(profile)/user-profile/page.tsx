import { auth } from '@/auth'
import React from 'react'
import UpdateProfile from '../update-profile/_actions/update-profile';
import Link from 'next/link';

const UserProfilepage = async () => {
    const session = await auth();

    return (
        <div className='flex flex-col gap-2'>
            <h4 className='text-center my-10'>UserProfilepage</h4>
            <Link href={'/dashboard/update-profile'} className='text-sm bg-green-500 rounded-md shadow-md px-4 py-1 w-fit text-zinc-50'>Update Profile</Link>
            <div>
                <h4 className='flex gap-20 border-b items-center w-fit'>
                    <span>Name:</span> <span>{
                        session?.user?.name || "no data found"
                    }</span>
                </h4>
                <h4 className='flex gap-20 border-b items-center w-fit'>
                    <span>Email:</span> <span>{
                        session?.user?.email || "no data found"
                    }</span>
                </h4>
                <h4 className='flex gap-20 border-b items-center w-fit'>
                    <span>Provider-id:</span> <span className=''>{
                        session?.user?.id || "no data found"
                    }</span>
                </h4>
            </div>
        </div>
    )
}

export default UserProfilepage