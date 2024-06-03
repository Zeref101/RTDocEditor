import React from "react"
import { UserDetails } from "@/context/UserDetails"

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <main className="text-white flex min-h-screen flex-col items-center justify-between  bg-[#171717]">
            <UserDetails>
                <div className="min-h-screen">
                    {children}
                </div>
            </UserDetails>
        </main>
    )
}

export default Layout