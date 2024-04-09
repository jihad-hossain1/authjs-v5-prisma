'use client';

import { validatedTag } from '@/helpers/validatedTag';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface UserProps {
    user: {
        name: string;
        email: string;
        id: string;
    } | undefined | null
}

const UpdateProfile: React.FC<UserProps> = ({ user }) => {

    const router = useRouter();

    const initialValue: { name: string | undefined; email: string | undefined } = {
        name: user?.name,
        email: user?.email
    }

    const [formData, setFormData] = useState(initialValue);
    const [loading, setloading] = useState<boolean>(false);


    function handleChange(e: { target: { name: any; value: any; }; }) {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function onHandleSubmit() {
        try {
            setloading(true);

            const response = await fetch(`/api/backend/users/${user?.id}`, {
                headers: {
                    "Content-Type": "applications/json"
                },
                body: JSON.stringify({ ...formData }),
                method: "PATCH"
            });

            const result = await response.json();

            if (response.ok) {
                setloading(false);
                toast.success('user update successufll')

                validatedTag('user');
                router.refresh()
                console.log(result)

            } else if (!response.ok) {
                setloading(false);
                toast.error(result?.error)

                console.log(result);
                router.refresh()
            }



        } catch (error) {
            console.log(error)
        }
    };



    return (
        <main className='flex flex-col gap-2 max-w-[600px] mx-auto'>

            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" className='px-3 py-1 border focus:outline-dotted ' value={formData.name} onChange={handleChange} id="name" />

            <label htmlFor="email">Email</label>
            <input type="text" name="email" className='px-3 py-1 border focus:outline-dotted ' value={formData.email} onChange={handleChange} id="email" />

            <button type='button' onClick={onHandleSubmit} className='w-fit bg-green-600 px-4 py-1 text-sm text-slate-50'> update </button>
        </main>

    )
}

export default UpdateProfile