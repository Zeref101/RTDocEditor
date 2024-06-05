import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="w-full min-h-screen text-[rgba(255,255,255,0.88)] flex  pt-36 px-12 flex-col items-center justify-start bg-radial-gradient font-poppins">
            <div className=" w-2/3 flex flex-col items-start">
                <div className=" flex flex-col  gap-8">

                    <span className="text-[3.7rem]  font-semibold leading-[42px] tracking-tighter gap-4">Edit Together, Succeed Together!</span>
                    <div className=" flex flex-col text-[25px] font-normal leading-[25.2px] gap-4 justify-center items-center text-[rgba(255,255,255,0.65)]">
                        <span>Turn your ideas into action</span>
                        <span>with <b>RTDE</b> workspace</span>
                        <Link href={'/dashboard'} className=" text-[20px] text-[rgba(255,255,255,0.75)] bg-[rgba(144,7,105,1)] w-fit p-3 px-8 rounded-md mt-8 hover:bg-[#f572d0ab]">Get Started</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
