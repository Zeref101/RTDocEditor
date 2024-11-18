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
// import { useSearchParams } from 'next/navigation';
import io from 'socket.io-client';
import { useMemo } from 'react';
import dotenv from "dotenv";


interface TipTapProps {
    document_id: string;
    username: string;
    isEditable: boolean;
    isPersonalDoc: boolean;
    setIsLoading: (isloading: boolean) => void;
}

const Tiptap = ({ document_id, username, isEditable, isPersonalDoc, setIsLoading }: TipTapProps) => {

    const socket = useMemo(() => io('http://localhost:5000'), []);
    const doc = React.useMemo(() => new Y.Doc(), []);

    const provider = React.useMemo(() => new TiptapCollabProvider({
        name: document_id,
        appId: "y9wv0gmx",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE5NTE1NjEsIm5iZiI6MTczMTk1MTU2MSwiZXhwIjoxNzMyMDM3OTYxLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJ5OXd2MGdteCJ9.KHqjt3n30Mu-JdvplN9NSZ05Dnhmj3mVBxfhCo5UD-U",
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
        if (!editor) return;

        editor.on('update', ({ editor }) => {
            const content = editor.getHTML();
            socket.emit('send-changes', { updatedContent: content, docId: document_id });
        })

        return () => {
            editor.off('update');
        }
    }, [document_id, editor, socket]);

    React.useEffect(() => {
        socket.emit('get-document', document_id);

        // * Load initial content
        socket.on('load-document', (content) => {
            editor?.commands.setContent(content);
            setIsLoading(false);
        })

        // * Update editor content on receiving changes from other users
        socket.on('receive-changes', (updatedContent) => {
            if (editor) {
                editor.commands.setContent(updatedContent, false);
            }
        });

        return () => {
            socket.off('load-document');
            socket.off('receive-changes');
            socket.disconnect();
        }

    }, [document_id, editor, setIsLoading, socket])


    return (
        <div className='tiptap'>

            <EditorContent editor={editor} />


        </div>
    )
}

export default Tiptap