'use client'
import React, { useState } from 'react'
import login from "/public/login.svg"
import Image from 'next/image'
import google from "/public/google.svg"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import axios from 'axios'

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const signIn = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:8000/api/auth/signIn`, {
                email: email,
                password: password
            });

            if (response.status === 200) {

                // toast.success('Successfully toasted!')
                router.push('http://localhost:3000/')
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className=' flex flex-col justify-center items-center w-2/4 '>
            <div className='flex flex-col justify-center items-center'>
                <Image
                    src={login}
                    alt='login'
                    width={40}
                    height={40}
                    className=' mb-8'
                />
                <span className=' text-[40px] font-bold leading-[42px] tracking-tighter py-2'>Signin</span>
                <p className=' text-[#848484] mt-4 text-[18px] font-semibold leading-[25.2px]'>
                    Welcome back! Sign in to continue exploring our amazing features.
                </p>
            </div>
            <form action=""
                className='flex flex-col gap-4 w-3/5 justify-start mt-4 '
                onSubmit={(e) => {
                    e.preventDefault();
                    signIn(e)
                }}
            >

                <label htmlFor="email" className='text-[18px] font-medium leading-[25.2px]'>Email <span className=' text-red-600'>*</span></label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    className=' rounded-md p-3 border border-[#212734] bg-[#0F1117]'
                    onChange={(e) => setEmail(e.target.value)}

                />

                <label htmlFor="password" className='text-[18px] font-medium leading-[25.2px]'>Password <span className=' text-red-600'>*</span></label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    className=' rounded-md p-3 border border-[#212734] bg-[#0F1117]'
                    onChange={(e) => setPassword(e.target.value)}

                />


                <input type="submit" value={loading ? "Loading..." : "Sign In"} disabled={loading} className=' bg-[#d0aae7] mt-8 w-full p-3 border rounded-md text-black cursor-pointer' />
                <div className='separator text-[18px] font-medium leading-[13px]'>or</div>
            </form>
            <button className=' flex items-center justify-center w-3/5 border-2 p-2.5 rounded-md' onClick={() => {
                window.location.href = `http://localhost:8000/auth/google`;
            }} >
                <Image
                    src={google}
                    alt='google'
                    width={40}
                    height={40}
                />
                <p className='text-[18px] font-semibold leading-[18.2px]'>Login with Google</p>
            </button>
            <p className='mt-4 text-[18px] font-semibold leading-[18.2px]'>Dont have an account?
                <Link
                    href="/signUp"
                    className='text-blue-500'>
                    {" "}Sign up
                </Link>
            </p>

        </div>
    )
}

export default Page
