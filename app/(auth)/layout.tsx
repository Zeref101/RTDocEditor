import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <main className="text-white flex min-h-screen flex-col items-center justify-between p-24 bg-[#171717]">
            {children}
        </main>
    )
}

export default Layout