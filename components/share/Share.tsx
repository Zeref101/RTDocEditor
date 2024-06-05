'use client';
import Image from 'next/image'
import React from 'react'
import share from "../../public/share.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Share = ({ doc_id }: { doc_id: string }) => {
    const shareableLink = `${window.location.origin}/document/${doc_id}`

    const copyToClipboard = React.useCallback(() => {
        navigator.clipboard.writeText(shareableLink)
            .then(() => toast.success('Link copied to clipboard!', {
                style: {
                    backgroundColor: "#26262c",
                    color: "#EEE"
                }
            }))
            .catch(err => {
                console.error('Could not copy link: ', err);
                toast.error('Failed to copy link', {
                    style: {
                        backgroundColor: "#26262c",
                        color: "#EEE"
                    }
                });
            });
    }, [shareableLink]);
    return (
        <div>
            <ToastContainer position="bottom-center" />

            <div
                className=' font-poppins text-[20px] flex gap-2 cursor-pointer '
                onClick={copyToClipboard}
            >
                <p >Share</p>
                <Image
                    src={share}
                    alt='share'
                    width={20}
                    height={20}
                />
            </div>
        </div>
    )
}

export default Share
