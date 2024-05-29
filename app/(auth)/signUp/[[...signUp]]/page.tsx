'use client'
import React, { useState } from 'react'
import login from "/public/login.svg"
import Image from 'next/image'
import google from "/public/google.svg"
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast"

const Page = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const signUp = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:8000/api/auth/signUp`, {
                email: email,
                username: username,
                password: password
            });
            if (response.status === 201) {

                // toast.success('Successfully toasted!')
                router.push('/signIn')
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
                <span className=' text-[40px] font-bold leading-[42px] tracking-tighter py-2'>Signup</span>
                <p className=' text-[#848484] mt-4 text-[18px] font-semibold leading-[25.2px]'>
                    Create your account and start exploring our amazing features!
                </p>
            </div>
            <form
                action=""
                className='flex flex-col gap-4 w-3/5 justify-start mt-4 '
                onSubmit={(e) => {
                    e.preventDefault();
                    signUp(e)
                }}
            >
                <label htmlFor="username"
                    className='text-[18px] font-medium leading-[25.2px]'
                >Username <span className=' text-red-600'>*</span></label>
                <input
                    type="text"
                    id='username'
                    name="username"
                    placeholder="Username"
                    required
                    className=' rounded-md p-3 border border-[#212734] bg-[#0F1117]'
                    onChange={(e) => setUsername(e.target.value)}
                />

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

                <input type="submit" value={loading ? "Loading..." : "Sign Up"} className=' bg-[#d0aae7] mt-8 w-full p-3 border rounded-md text-black cursor-pointer' disabled={loading} />
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
                <p className='text-[18px] font-semibold leading-[18.2px]'>Sign up with Google</p>
            </button>
            <p className='mt-4 text-[18px] font-semibold leading-[18.2px]'>Already have an account? <Link href="/signIn" className='text-blue-500'>{" "}Sign in</Link></p>

        </div>
    )
}

export default Page
