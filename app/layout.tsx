import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { UserDetails } from "@/context/UserDetails";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
})

export const metadata: Metadata = {
  title: "RTDE",
  description: "RTDE (Real Time Document Editor) is a dynamic tool for creating and editing documents in real time. Similar to Notion, it's primarily used for documenting various types of content, but with added real-time operation support for seamless collaboration and instant updates.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <UserDetails>

          {children}
        </UserDetails>
      </body>

    </html>
  );
}
