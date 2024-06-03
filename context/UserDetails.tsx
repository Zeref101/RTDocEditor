'use client'
import React, { useState, createContext, useEffect, useContext } from "react";
import { ObjectId } from 'mongodb';

export interface UserProps {
    _id: ObjectId,
    username: string,
    email: string,
    avatar?: string
}

export interface UserContextProps {
    user: UserProps | null,
    setUser: (user: UserProps | null) => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserDetails = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProps | null>(null);

    const existingUser = useContext(UserContext);

    useEffect(() => {
        let sessionCookie = document.cookie.split("; ").find((cookie) => {
            return cookie.startsWith("pookie");
        })
        if (sessionCookie) {
            let cookieValue = sessionCookie.split("=")[1];

            const fetchUserDetails = async () => {
                try {
                    console.log('Fetching user details with session ID:', cookieValue);

                    const response = await fetch(`http://localhost:8000/api/sessions/${cookieValue}`);
                    const data = await response.json();
                    console.log('Received data from server:', data);

                    setUser(data.user);
                    console.log('Set user:', data.user);

                    console.log(data.user)
                } catch (error) {
                    console.error('Failed to fetch user details:', error);
                }
            };
            if (!existingUser) {
                fetchUserDetails();

            }

        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;