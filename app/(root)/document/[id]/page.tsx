import React from 'react'
import Tiptap from '@/components/editor/TipTap'

const Page = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <div>Document: {params.id}</div>
                <div className=' w-2/5 h-full'>
                    <Tiptap
                        document_id={params.id}
                    />
                </div>
            </div>

        </>

    )
}

export default Page
