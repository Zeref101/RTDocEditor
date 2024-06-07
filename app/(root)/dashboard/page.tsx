'use client'
import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '@/context/UserDetails';
import { UserContextProps } from '@/context/UserDetails';

const Page = () => {
    const userContext = useContext(UserContext) as UserContextProps;

    const { user } = userContext;

    const createDocument = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/documents', {
                owner: user?._id,
            });

            console.log('Document created:', response.data._id);
        } catch (error) {
            console.error('Failed to create document:', error);
        }
    };

    return (
        <div>
            Dashboard
        </div>
    );
};

export default Page;