'use client'

import './styles.css'
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Collaboration from '@tiptap/extension-collaboration';
import * as Y from "yjs"
import { TiptapCollabProvider } from '@hocuspocus/provider';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';

interface TipTapProps {
    document_id: string,
    username: string
}

const Tiptap = ({ document_id, username }: TipTapProps) => {
    const [isLoading, setIsLoading] = React.useState(true);

    const doc = React.useMemo(() => new Y.Doc(), []);
    const provider = React.useMemo(() => new TiptapCollabProvider({
        name: document_id,
        appId: "y9wv0gmx",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTc0MjExODgsIm5iZiI6MTcxNzQyMTE4OCwiZXhwIjoxNzE3NTA3NTg4LCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJ5OXd2MGdteCJ9.oqWAl-HonSB2f_D5nMy2ynLy_3TTpUEIKI6oZVclh8I",
        document: doc,
    }), [document_id, doc]);


    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Typography,
            Collaboration.configure({
                document: doc
            }),
            CollaborationCursor.configure({
                provider,
                user: {
                    name: username,
                    color: '#f783ac'
                }
            })
        ],
        content: "Type here",
        onUpdate: () => setIsLoading(false),
    })
    React.useEffect(() => {
        return () => {
            editor?.destroy();
            provider.disconnect();
        };
    }, [editor, provider])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='tiptap'>

            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap