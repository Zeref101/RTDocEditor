import React from 'react'
import Share from '../share/Share'
import Saved from '../share/Saved'
import UserContext, { UserContextProps } from '@/context/UserDetails'

interface DocNavProp {
    doc_id: string,
    hasSaved: boolean,


}

const DocNav = ({ doc_id, hasSaved }: DocNavProp) => {
    const userContext = React.useContext(UserContext) as UserContextProps;
    const { user } = userContext;

    return (
        <>
            <div className=' w-full p-4 h-auto flex justify-between'>
                <div></div>
                <div className=' flex gap-6 items-center justify-center px-8'>
                    <Share doc_id={doc_id} />
                    <Saved hasSaved={hasSaved} userId={user?._id?.toString() ?? ''} docId={doc_id} />
                </div>
            </div>
        </>
    )
}

export default DocNav
