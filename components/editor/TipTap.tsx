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
import 'react-loading-skeleton/dist/skeleton.css'
import { useSearchParams } from 'next/navigation';

interface TipTapProps {
    document_id: string,
    username: string
    isEditable: boolean
}

const Tiptap = ({ document_id, username, isEditable }: TipTapProps) => {

    const [isLoading, setIsLoading] = React.useState(true);
    const doc = React.useMemo(() => new Y.Doc(), []);

    const provider = React.useMemo(() => new TiptapCollabProvider({
        name: document_id,
        appId: "y9wv0gmx",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTc1NzgwNzIsIm5iZiI6MTcxNzU3ODA3MiwiZXhwIjoxNzE3NjY0NDcyLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJ5OXd2MGdteCJ9.Eh1jOCmZuhvkGVxKoUs3C9wu_kaGS1-GCyKYuLttJCU",
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
        editable: isEditable


    })


    React.useEffect(() => {
        provider.connect();
        setIsLoading(false);
        return () => {
            editor?.destroy();
            provider.disconnect();
        };
    }, [editor, provider])


    return (
        <div className='tiptap'>
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <EditorContent editor={editor} />
                )
            }
        </div>
    )
}

export default Tiptap