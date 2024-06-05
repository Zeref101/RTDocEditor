'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import share from "../../public/share.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import view from "../../public/view.svg"
import editOff from "../../public/editOff.svg"
import edit from "../../public/edit.svg"

const Share = ({ doc_id }: { doc_id: string }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const copyToClipboard = (edit: boolean) => {
        const shareableLink = `${window.location.origin}/document/${doc_id}?edit=${edit}`;

        navigator.clipboard.writeText(shareableLink)
            .then(() => {
                toast.success('Link copied to clipboard!', {
                    style: {
                        backgroundColor: "#26262c",
                        color: "#EEE"
                    }

                }
                )
                setShowDropdown(false);
            }
            )
            .catch(err => {
                console.error('Could not copy link: ', err);
                toast.error('Failed to copy link', {
                    style: {
                        backgroundColor: "#26262c",
                        color: "#EEE"
                    }
                });
            });
    };

    return (
        <>
            <ToastContainer position='bottom-center'></ToastContainer>
            <div className='relative w-[300px] flex flex-col gap-4 justify-end font-poppins'>
                <div
                    className='font-poppins text-[20px] gap-2 cursor-pointer flex justify-end'
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <p>Share</p>
                    <Image
                        src={share}
                        alt='share'
                        width={20}
                        height={20}
                    />
                </div>
                {showDropdown && (
                    <div className="absolute top-full left-[30%] bg-[#26262c] border border-[rgb(20,20,20)] mt-4 w-[200px] rounded p-2 z-10 font-semibold shadow-xl">
                        <button className="flex flex-row justify-between items-center w-full mb-2 p-2 rounded-md hover:bg-[#7978789a]"
                            onClick=
                            {() => copyToClipboard(false)}
                        >
                            Share
                            <div className='flex gap-2'>

                                <Image src={view} alt='view' />
                                <Image src={editOff} alt='Edit off' />
                            </div>
                        </button>
                        <button className="flex flex-row justify-between items-center w-full mb-2 p-2 rounded-md hover:bg-[#7978789a]"
                            onClick={() => copyToClipboard(true)}
                        >
                            Share
                            <div className=' flex gap-2'>

                                <Image src={view} alt='view' />
                                <Image src={edit} alt='Edit' />
                            </div>
                        </button>
                    </div>
                )}

            </div>
        </>
    );
}

export default Share;