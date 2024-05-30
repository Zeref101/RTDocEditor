'use client'

import './styles.css'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Typography
        ],
        content: `
        <p>Type here</p>

        `,
    })

    return (
        <div className='tiptap'>

            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap