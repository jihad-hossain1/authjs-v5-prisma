import Link from 'next/link'
import React from 'react'
import LoginForm from './_form/LoginForm'

const Loginpage = () => {
  return (
    <div  className='max-w-[600px] mx-auto p-4 '>
          <LoginForm />
          <Link href={'/register'}>register</Link>
    </div>
  )
}

export default Loginpage
