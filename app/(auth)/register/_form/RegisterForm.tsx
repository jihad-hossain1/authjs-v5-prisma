'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const RegisterForm: React.FC = () => {
    const initialValue= {
        name: "",
        email: "",
        password: ""
    }

    const router = useRouter()
    const [errors, setErrors] = useState<string | null>(null);
    const [success, setsuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
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

        try {
            setLoading(true);

            const response = await fetch('/api/backend/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...formData})
            })

            const result = await response.json();

            console.log(result);

            if (!response.ok) {
                setLoading(false)
                setErrors(result?.error);
                router.refresh()
                return;
            }

            setLoading(false);
            if (result.message) {
                setsuccess(result.message)
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (errors || success) {
            console.log(errors, success)
        }
    }, [errors, success]);
  return (
      <div className='flex flex-col gap-5'>
          <input type="text" name="name" value={formData.name} onChange={handleChange} id="name" placeholder='full name' />

          <input type="email" name="email" value={formData.email} onChange={handleChange} id="email" placeholder='email name' />

          <input type="password" name="password" value={formData.password} onChange={handleChange} id="password" placeholder='password' />

          <button disabled={loading} type='submit' onClick={handleSubmit} className='text-white bg-black rounded-md px-3 py-1 text-sm '>
              {loading ? <span>Loading.....</span>: <span>register a user</span>}
          </button>

          {success && <h4 className='bg-green-200 rounded-md w-fit px-6 py-1 text-sm'>
              {success}
          </h4>}
          {errors && <h4 className='bg-red-200 rounded-md w-fit px-6 py-1 text-sm'>
              {errors}
          </h4>}

    </div>
  )
}

export default RegisterForm