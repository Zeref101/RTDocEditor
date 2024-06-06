'use client'
import React from 'react'
import Tiptap from '@/components/editor/TipTap'
import UserContext, { UserContextProps } from '@/context/UserDetails';
import Share from '@/components/share/Share';
import { useSearchParams } from 'next/navigation';
import DocNav from '@/components/documentNavbar/DocNav';
import axios from 'axios';

const Page = ({ params }: { params: { id: string } }) => {
    const userContext = React.useContext(UserContext) as UserContextProps;
    const { user } = userContext;
    const [isLoading, setIsLoading] = React.useState(true);
    const searchParams = useSearchParams();
    const [isEditable, setIsEditable] = React.useState(false);
    const [isCollaborator, setIsCollaborator] = React.useState(false)


    React.useEffect(() => {
        if (user) {
            setIsLoading(false);
        }
    }, [user]);

    React.useEffect(() => {
        setIsEditable(searchParams.get("edit") === "true" ? true : false);
        setIsCollaborator(searchParams.get("collab") === "true" ? true : false);
        // console.log(searchParams.keys())
    }, [searchParams]);

    React.useEffect(() => {
        if (isCollaborator && user?._id && params.id) {
            axios.post(`http://localhost:8000/api/collab_doc/addUser/${params.id}`, { userId: user._id })
                .then(response => {
                    console.log('User added as collaborator', response.data);
                })
                .catch(error => {
                    console.error('Error adding user as collaborator', error);
                });
        }
    }, [isCollaborator, user?._id, params.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <DocNav
                doc_id={params.id}
                hasSaved={user?.savedDocuments ? user.savedDocuments.includes(params.id) : false}
            />
            <div className='w-full h-screen p-8 mt-24 overflow-y-scroll flex flex-col justify-center items-center font-poppins'>
                <div className=' w-2/5 h-full'>

                    <Tiptap
                        document_id={params.id}
                        username={user?.username ? user.username : "default"}
                        isEditable={isEditable}

                    />
                </div>
            </div>

        </>

    )
}

export default Page
