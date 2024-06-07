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
    document_id: string;
    username: string;
    isEditable: boolean;
    isPersonalDoc: boolean;
    setIsLoading: (isloading: boolean) => void;
}

const Tiptap = ({ document_id, username, isEditable, isPersonalDoc, setIsLoading }: TipTapProps) => {

    const doc = React.useMemo(() => new Y.Doc(), []);

    const provider = React.useMemo(() => new TiptapCollabProvider({
        name: document_id,
        appId: "y9wv0gmx",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTc3Mzg0NTIsIm5iZiI6MTcxNzczODQ1MiwiZXhwIjoxNzE3ODI0ODUyLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJ5OXd2MGdteCJ9.8D6-WgAY8P2cwbdw2iJszwUwsXsUPw19Bqkx8NfRBNU",
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
        content: isPersonalDoc ? "<h1>Personal Home</h1><br><h4>Organize everything in your life in one place.</h4>" : "",
        editable: isEditable
    })


    React.useEffect(() => {
        if (!isPersonalDoc) {

            provider.connect();
        }
        setIsLoading(false);
        return () => {
            editor?.destroy();
            if (!isPersonalDoc) {
                provider.disconnect();
            }
        };
    }, [editor, provider, isPersonalDoc, setIsLoading])


    return (
        <div className='tiptap'>

            <EditorContent editor={editor} />


        </div>
    )
}

export default Tiptap