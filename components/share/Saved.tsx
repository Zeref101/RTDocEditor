import Image from 'next/image'
import React from 'react'
import nonSaveState from "../../public/star-red.svg"
import savedState from "../../public/star-filled.svg"
import axios from 'axios'
import UserContext, { UserContextProps } from '@/context/UserDetails'

const Saved = ({ hasSaved, userId, docId }: { hasSaved: boolean, userId: string, docId: string }) => {

    const userContext = React.useContext(UserContext) as UserContextProps;
    const { user } = userContext;

    const [isSaved, setIsSaved] = React.useState(hasSaved);


    const handleClick = async () => {
        try {
            setIsSaved(!isSaved); // Toggle the saved state immediately when clicked
            if (isSaved) {
                const response = await axios.post(`http://localhost:8000/api/removeDocument/${userId}/${docId}`);
                console.log(response.data);
            } else {
                const response = await axios.post(`http://localhost:8000/api/saveDocument/${userId}/${docId}`);
                console.log(response.data);
            }
        } catch (error) {
            console.error(error);
            setIsSaved(isSaved); // If there's an error, revert the saved state
        }
    };
    return (
        <div className=' flex'>
            <Image
                src={isSaved ? savedState : nonSaveState} // Use the new state variable here
                alt='save'
                width={25}
                height={25}
                onClick={handleClick}
                className=' cursor-pointer'
            />

        </div>
    )
}

export default Saved
