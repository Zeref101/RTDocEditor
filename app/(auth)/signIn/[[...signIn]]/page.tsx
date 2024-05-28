'use client'
import React from 'react'
import login from "/public/login.svg"
import Image from 'next/image'
import google from "/public/google.svg"
import Link from 'next/link'

const page = () => {
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
            <form action="" className='flex flex-col gap-4 w-3/5 justify-start mt-4 '>
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
                />

                <label htmlFor="email" className='text-[18px] font-medium leading-[25.2px]'>Email <span className=' text-red-600'>*</span></label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    className=' rounded-md p-3 border border-[#212734] bg-[#0F1117]'
                />

                <label htmlFor="password" className='text-[18px] font-medium leading-[25.2px]'>Password <span className=' text-red-600'>*</span></label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    className=' rounded-md p-3 border border-[#212734] bg-[#0F1117]'
                />

                <input type="submit" value="Sign In" className=' bg-[#d0aae7] mt-8 w-full p-3 border rounded-md text-black cursor-pointer' />
                <div className='separator text-[18px] font-medium leading-[13px]'>or</div>
            </form>
            <button className=' flex items-center justify-center w-3/5 border-2 p-2.5 rounded-md' onClick={() => {
                console.log("hello")
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

export default page
