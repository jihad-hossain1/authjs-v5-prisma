'use client'

import React, { useState, useTransition } from 'react'
import { login } from '../login';
import { useSearchParams } from 'next/navigation';
import { Social } from './social-login';

const LoginForm: React.FC = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const initialValue = {
        email: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialValue);


    const handleChange = (e: { target: { name: any; value: any } }) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        startTransition(() => {
            login(formData, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error.toString());
                    }
                }).
                catch(() => setError("Something went wrong"))
        });
    }


    return (
        <div className='flex flex-col gap-5'>
            <h4 className='text-sm text-red-600'>{error || urlError}</h4>
            <h4 className='text-sm text-green-600'>{success}</h4>

            <input type="email" name="email" value={formData.email} onChange={handleChange} id="email" placeholder='email name' />

            <input type="password" name="password" value={formData.password} onChange={handleChange} id="password" placeholder='password' />

            <button disabled={isPending} type='submit' onClick={handleSubmit} className='text-white bg-black rounded-md px-3 py-1 text-sm '>
                Login
            </button>


            <Social />
        </div>
    )
}

export default LoginForm