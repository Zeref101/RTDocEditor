'use client'
import React from 'react'
import Tiptap from '@/components/editor/TipTap'
import UserContext, { UserContextProps } from '@/context/UserDetails';
import Share from '@/components/share/Share';

const Page = ({ params }: { params: { id: string } }) => {
    const userContext = React.useContext(UserContext) as UserContextProps;
    const { user } = userContext;
    // console.log(user?.username)
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (user) {
            setIsLoading(false);
        }
    }, [user]);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Share doc_id={params.id} />
            <div className='w-full h-screen p-8 mt-24 overflow-y-scroll flex flex-col justify-center items-center font-poppins'>
                <div className=' w-2/5 h-full'>
                    <Tiptap
                        document_id={params.id}
                        username={user?.username ? user.username : "default"}

                    />
                </div>
            </div>

        </>

    )
}

export default Page
