import { getUser } from '@/app/api/frontend/users/users'
import { auth } from '@/auth'
import React from 'react'
import UpdateProfile from './_actions/update-profile';

const Updatepage: React.FC = async () => {
    const session = await auth();
    const id = session?.user?.id;
    const user = await getUser(id);

    return (
        <div>
            <UpdateProfile user={user} />
        </div>
    )
}

export default Updatepage