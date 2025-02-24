'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface EditorProps {
    content: string;
    onChange: (content: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose mx-auto focus:outline-none p-6 max-w-[75ch]',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    return (
        <div className="min-h-screen w-full max-w-screen-lg mx-auto">
            <EditorContent editor={editor} />
        </div>
    )
} 