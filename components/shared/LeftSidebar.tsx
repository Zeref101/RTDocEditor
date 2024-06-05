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

    React.useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/documents");
                setFetchedDocs(response.data)
            } catch (error) {
                console.error('Failed to fetch documents:', error);
            }
        };

        fetchDocs();

    }, [])


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
                    href={`/document/${docLink}`}
                    className='flex items-center justify-start gap-4 bg-transparent py-2 hover:bg-[#3f3f4292] rounded-md p-1'
                    onClick={async (e) => {
                        e.preventDefault();
                        const target = e.target as HTMLElement;
                        if (target.outerText === "Create a new Doc") {
                            if (user) {
                                const newDocLink: string = await createDocument(user);
                                setDocLink(newDocLink);
                                router.push(`/document/${newDocLink}`);
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
            <p className=' text-gray-400 font-poppins mt-4'>private</p>
            <div className=' flex flex-col gap-4 mt-4'>

                {
                    fetchedDocs ? (
                        fetchedDocs.map(doc => (
                            <Link
                                href={editingDocId !== doc.id ? `/document/${doc.id}` : '#'}
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
                                            // console.log(fetchedDocs.map((document) => document.id === doc.id ? { ...document, title } : document))
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
    );
}

export default LeftSidebar;
