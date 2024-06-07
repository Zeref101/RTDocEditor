'use client';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import rtde from "../public/rtde.png"
import UserContext, { UserContextProps } from '@/context/UserDetails';

const Page = () => {
    const userContext = React.useContext(UserContext) as UserContextProps;
    const { user } = userContext;
    return (
        <main className="w-full min-h-screen text-[rgba(255,255,255,0.88)] flex  pt-36 px-12 flex-col items-center justify-start bg-radial-gradient font-poppins">
            <div className=" w-2/3 flex flex-col items-start">
                <div className=" flex flex-col  gap-8">

                    <span className="text-[3.7rem]  font-semibold leading-[42px] tracking-tighter gap-4">Edit Together, Succeed Together!</span>
                    <div className=" flex flex-col text-[25px] font-normal leading-[25.2px] gap-4 justify-center items-center text-[rgba(255,255,255,0.65)]">
                        <span>Turn your ideas into action</span>
                        <span>with <b>RTDE</b> workspace</span>
                        <Link href={`/document/${user?.personal}/?edit=true`} className=" text-[20px] text-[rgba(255,255,255,0.75)] bg-[rgba(144,7,105,1)] w-fit p-3 px-8 rounded-md mt-8 hover:bg-[#f572d0ab]">Get Started</Link>
                    </div>
                </div>
                <Image
                    src={rtde}
                    alt='image'
                    className=' w-[950px] mt-8 rounded-md shadow-lg'
                />
            </div>
        </main>
    )
}

export default Page
