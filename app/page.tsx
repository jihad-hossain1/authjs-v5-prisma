
import { auth } from '@/auth';
import React from 'react'

const Homepage = async () => {
  const session = await auth();

  console.log("user info after login..", session?.user)

  return (
    <div>
      Homepage
    </div>
  )
}

export default Homepage
