'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react';

interface EditorProps {
    content: string;
    onChange: (content: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: 'my-2',
                    },
                },
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-neutral dark:prose-invert focus:outline-none p-6',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (content) {
            console.log('updating editor content', content);
            editor?.commands.setContent(content);
        }
    }, [content]);

    return (
        <div className="w-full mx-auto overflow-y-auto">
            <EditorContent
                editor={editor}
                className="[&_.ProseMirror]:!max-w-[72ch] [&_.ProseMirror]:mx-auto [&_.ProseMirror]:streaming-animation [&_.ProseMirror_h1]:w-fit [&_.ProseMirror_h2]:w-fit [&_.ProseMirror_h3]:w-fit [&_.ProseMirror_h4]:w-fit [&_.ProseMirror_h5]:w-fit [&_.ProseMirror_h6]:w-fit [&_.ProseMirror_li:not(:has(pre))]:w-fit"
            />
        </div>
    )
} 