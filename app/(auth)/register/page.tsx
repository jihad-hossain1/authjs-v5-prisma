import Link from 'next/link'
import React from 'react'
import RegisterForm from './_form/RegisterForm'

const Registerpage:React.FC = () => {
  return (
    <div className='max-w-[600px] mx-auto p-4'>
          <RegisterForm />
          <Link href={'/login'}>login</Link>
    </div>
  )
}

export default Registerpage
