import React from "react"
import { UserDetails } from "@/context/UserDetails"
import Navbar from "@/components/shared/Navbar"
import LeftSidebar from "@/components/shared/LeftSidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        // <UserDetails>
        <main className=" bg-[#1c1c20] relative flex">
            <LeftSidebar />
            <div className=" w-full ">
                {children}
            </div>
        </main>
        // </UserDetails>
    )
}

export default Layout