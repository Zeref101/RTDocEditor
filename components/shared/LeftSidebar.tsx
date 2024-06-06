'use client'
import UserContext, { UserContextProps } from '@/context/UserDetails'
import Image from 'next/image'
import React, { useContext } from 'react'
import defaultpfp from "/public/default.jpg";
import { sidebarLinks } from '@/constants/Sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createDocument } from '@/services/document';
import add from "../../public/add.svg";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import edit from "../../public/edit.svg"
import { CollaborationDocumentProp } from '@/types';
import logout from "../../public/logout.svg";
import Cookies from 'js-cookie';

interface docProp {
    id: string,
    title: string
}



const LeftSidebar = () => {
    const pathname = usePathname();
    const userContext = useContext(UserContext) as UserContextProps;
    const { user, loading } = userContext;
    const [docLink, setDocLink] = React.useState("");
    const router = useRouter();
    const [fetchedDocs, setFetchedDocs] = React.useState<docProp[] | []>([])
    const [editingDocId, setEditingDocId] = React.useState<string | null>(null);
    const [collabDocs, setCollabDocs] = React.useState<CollaborationDocumentProp[] | []>([]);

    React.useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/documents/${user?._id}`);
                setFetchedDocs(response.data)
            } catch (error) {
                console.error('Failed to fetch documents:', error);
            }
        };
        if (user?._id) {

            fetchDocs();
        } else {
            console.log("no user id found")
        }


    }, [user?._id])
    React.useEffect(() => {
        const fetchCollabDocs = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/collab_docs/getDocs/${user?._id}`);
                setCollabDocs(response.data);
            } catch (error) {
                console.error('Failed to fetch collaborated documents:', error);
            }
        };

        if (user?._id) {
            fetchCollabDocs();
        } else {
            console.log("no user id found")
        }
    }, [user?._id]);
    console.log(collabDocs, "iasofoiajfoajfoa")


    // console.log(user)

    if (loading) {
        return (
            <div className='w-[270px] sticky left-0 top-0 flex h-screen flex-col justify-start overflow-y-auto border-r p-3 bg-[#26262c]'>
                <div className='flex gap-4 justify-start items-center h-fit w-[175px] p-2.5'>
                    <span className='text-[15px] font-medium leading-[25.2px]'>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='w-[270px] sticky left-0 top-0 flex h-screen flex-col justify-start overflow-y-auto border-r-[rgb(20,20,20)] shadow-md p-3 bg-[#26262c] font-poppins'>
            <div className='flex gap-4 justify-start items-center h-fit w-[175px] p-2.5'>
                <Image
                    src={user?.avatar ? user.avatar : defaultpfp}
                    alt='avatar'
                    height={35}
                    width={35}
                    className='rounded-md'
                />
                <span className='text-[15px] font-medium leading-[25.2px]'>{user?.username ? user.username : "Default"}</span>
            </div>
            <div className='flex justify-between h-full flex-col'>
                <div>
                    <div>
                        {sidebarLinks.map((link) => {
                            return (
                                <Link
                                    href={link.route}
                                    key={link.label}
                                    className='flex items-center justify-start gap-4 bg-transparent py-2 hover:bg-[#3f3f4292] rounded-md p-1'

                                >
                                    <Image
                                        src={link.imgURL}
                                        alt={link.label}
                                        width={20}
                                        height={20}
                                        className=''
                                    />
                                    <p className=''>{link.label}</p>
                                </Link>
                            )
                        })}
                    </div>
                    <div>
                        <Link
                            href={`/document/${docLink}?edit=true`}
                            className='flex items-center justify-start gap-4 bg-transparent py-2 hover:bg-[#3f3f4292] rounded-md p-1'
                            onClick={async (e) => {
                                e.preventDefault();
                                const target = e.target as HTMLElement;
                                if (target.outerText === "Create a new Doc") {
                                    if (user) {
                                        const newDocLink: string = await createDocument(user);
                                        setDocLink(newDocLink);
                                        router.push(`/document/${newDocLink}?edit=true`);
                                        setFetchedDocs(prev => [...prev, { id: newDocLink, title: "New Document" }])
                                    } else {
                                        console.error('User is null');
                                    }
                                }
                            }}
                        >
                            <Image
                                src={add}
                                alt={`add`}
                                width={20}
                                height={20}
                                className=''
                            />
                            <p className=''>{`Create a new Doc`}</p>
                        </Link>
                    </div>
                    <p className=' text-gray-400 font-poppins mt-4'>Collaborate</p>
                    <div className=' flex flex-col gap-4 mt-4'>

                        {collabDocs.filter((doc) => doc.userId.length > 1).map((doc) => {
                            return (
                                <Link
                                    href={editingDocId !== doc.documentId._id.toString() ? `/document/${doc.documentId._id}?edit=true&collab=true` : '#'}
                                    key={doc.documentId._id.toString()}
                                    className='w-full'
                                >
                                    {editingDocId === doc.documentId._id.toString() ? (
                                        <input
                                            type="text"
                                            defaultValue={doc.documentId.title ? doc.documentId.title : "Tap here"}
                                            className='bg-transparent border w-full p-1 rounded-md line-clamp-1'
                                            autoFocus
                                            onBlur={async (e) => {

                                                const title = e.target.value;
                                                setCollabDocs(collabDocs.map((document) => document.documentId._id === doc.documentId._id ? { ...document, documentId: { ...document.documentId, title } } : document))
                                                setEditingDocId(null);
                                                try {
                                                    const title = e.target.value;
                                                    const response = await axios.put(`http://localhost:8000/api/document/${doc.documentId._id.toString()}`, { title });
                                                    console.log('Updated document:', response.data);
                                                } catch (error) {
                                                    console.error('Failed to update document:', error);
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className='flex justify-between items-center'>
                                            <span>{doc.documentId.title ? doc.documentId.title : "Tap here"}</span>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                setEditingDocId(doc.documentId._id.toString());
                                            }}>
                                                <Image
                                                    src={edit}
                                                    alt='Edit'
                                                    width={20}
                                                    height={20}
                                                />

                                            </button>
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <p className=' text-gray-400 font-poppins mt-4'>private</p>
                    <div className=' flex flex-col gap-4 mt-4'>

                        {
                            fetchedDocs ? (
                                fetchedDocs.filter(doc => !collabDocs.some(collabDoc => collabDoc.documentId._id.toString() === doc.id)).map(doc => (
                                    <Link
                                        href={editingDocId !== doc.id ? `/document/${doc.id}?edit=true` : '#'}
                                        key={doc.id}
                                        className='w-full'
                                    >
                                        {editingDocId === doc.id ? (
                                            <input
                                                type="text"
                                                defaultValue={doc.title ? doc.title : "Tap here"}
                                                className='bg-transparent border w-full p-1 rounded-md line-clamp-1'
                                                autoFocus
                                                onBlur={async (e) => {

                                                    const title = e.target.value;
                                                    setFetchedDocs(fetchedDocs.map((document) => document.id === doc.id ? { ...document, title } : document))
                                                    setEditingDocId(null);
                                                    try {
                                                        const title = e.target.value;
                                                        const response = await axios.put(`http://localhost:8000/api/document/${doc.id}`, { title });
                                                        console.log('Updated document:', response.data);
                                                    } catch (error) {
                                                        console.error('Failed to update document:', error);
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className='flex justify-between items-center'>
                                                <span>{doc.title ? doc.title : "Tap here"}</span>
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    setEditingDocId(doc.id);
                                                }}>
                                                    <Image
                                                        src={edit}
                                                        alt='Edit'
                                                        width={20}
                                                        height={20}
                                                    />

                                                </button>
                                            </div>
                                        )}
                                    </Link>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )
                        }
                    </div>

                </div>
                <button
                    onClick={() => {
                        Cookies.remove('pookie');
                        router.push('/signIn');
                    }}
                    className=' flex gap-4 hover:bg-[#55555690] p-1 rounded-md mb-8'
                >
                    <Image
                        src={logout}
                        alt='logout'
                        width={20}
                        height={20}
                    />
                    <p >
                        Logout
                    </p>
                </button>

            </div>



        </div>
    );
}

export default LeftSidebar;
