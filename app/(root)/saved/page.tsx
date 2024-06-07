'use client'
import UserContext, { UserContextProps } from '@/context/UserDetails';
import Link from 'next/link'
import React, { CSSProperties } from 'react'
import axios from 'axios';
import { docProp } from '@/types';
import PacmanLoader from "react-spinners/PacmanLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Page = () => {
    const userContext = React.useContext(UserContext) as UserContextProps;
    const { user } = userContext;
    const [fetchedDocs, setFetchedDocs] = React.useState<docProp[] | []>([]);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        const fetchDocs = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/savedDocuments/${user?._id}`);
                setFetchedDocs(response.data);
            } catch (error) {
                console.error('Failed to fetch documents:', error);
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        };

        if (user?._id) {
            fetchDocs();
        } else {
            console.log("no user id found");
        }
    }, [user?._id]);

    console.log(fetchedDocs);

    return (
        <div className='w-full p-4'>
            <p className=' text-[30px] leading-snug font-poppins font-semibold'>Saved Documents</p>
            <div className='mt-8 p-4 w-full flex flex-wrap gap-8 items-center '>
                {!isLoading && fetchedDocs.map((doc) => (
                    <Link
                        href={`/document/${doc._id}/?edit=true`}
                        className='card'
                        onClick={(e) => {
                            console.log(e)
                        }}
                        key={doc.title}
                    >
                        {doc.title}
                    </Link>
                ))}
            </div>
            {isLoading && ( // Conditionally render PacmanLoader based on isLoading state
                <PacmanLoader
                    color={"#eee"}
                    loading={isLoading}
                    cssOverride={override}
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            )}
        </div>
    )
}

export default Page;