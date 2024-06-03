'use client'

import './styles.css'
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Collaboration from '@tiptap/extension-collaboration';
import * as Y from "yjs"
import { debounce } from "lodash"
import axios from 'axios';

const Tiptap = ({ document_id }: { document_id: string }) => {
    const doc = new Y.Doc();
    const ws = React.useRef<WebSocket | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Typography,
            Collaboration.configure({
                document: doc
            })
        ],
        content: `
        <p>Type here Something</p>

        `,
    })
    React.useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:8000/`);
        ws.current.onopen = () => {
            console.log("Websocket connection established");
        }
        return () => {
            ws.current?.close();
        }
    }, [document_id])
    React.useEffect(() => {
        if (editor && ws.current) {
            const saveContent = debounce(() => {
                const htmlContent = editor.getHTML();
                ws.current?.send(JSON.stringify({
                    content: htmlContent,
                }));
            }, 1000);

            editor.on('update', saveContent);

            return () => {
                editor.off('update', saveContent);
            };
        }
    }, [editor]);

    return (
        <div className='tiptap'>

            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap