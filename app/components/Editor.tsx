'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorProps {
    content: string;
    onChange: (content: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
    const [loaded, setLoaded] = useState(false);
    const [hoveredParagraph, setHoveredParagraph] = useState<HTMLElement | null>(null);
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const buttonRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: 'my-2 relative group',
                    },
                },
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-neutral dark:prose-invert focus:outline-none p-6',
            },
            handleDOMEvents: {
                mouseover: (view, event) => {
                    const target = event.target as HTMLElement;
                    const paragraph = target.closest('p');

                    if (hideTimeoutRef.current) {
                        clearTimeout(hideTimeoutRef.current);
                    }

                    if (paragraph && paragraph !== hoveredParagraph) {
                        const rect = paragraph.getBoundingClientRect();
                        const editorRect = editorRef.current?.getBoundingClientRect() || { top: 0, left: 0 };

                        // Calculate position relative to the editor container
                        setButtonPosition({
                            top: rect.top - editorRect.top,
                            left: rect.left - editorRect.left + rect.width - 10
                        });
                        setHoveredParagraph(paragraph);
                    }
                    return false;
                },
                mouseout: (view, event) => {
                    const target = event.target as HTMLElement;
                    const relatedTarget = event.relatedTarget as HTMLElement;

                    // Don't hide if moving to the button
                    if (buttonRef.current?.contains(relatedTarget)) {
                        return false;
                    }

                    // Don't hide if moving between elements within the same paragraph
                    const targetParagraph = target.closest('p');
                    const relatedParagraph = relatedTarget?.closest('p');
                    if (targetParagraph && targetParagraph === relatedParagraph) {
                        return false;
                    }

                    // Set a small timeout before hiding to allow for clicking
                    hideTimeoutRef.current = setTimeout(() => {
                        setHoveredParagraph(null);
                    }, 100);

                    return false;
                }
            }
        },
        onUpdate: ({ editor }) => {
            setHoveredParagraph(null);
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (content && !loaded) {
            console.log('updating editor content', content);
            editor?.commands.setContent(content);
            setLoaded(true);
        }
    }, [content]);

    const handlePlusClick = () => {
        if (hoveredParagraph) {
            // TODO: Implement your action here
            console.log('Plus clicked for paragraph:', hoveredParagraph.textContent);
        }
    };

    return (
        <div className="w-full mx-auto overflow-y-auto relative" ref={editorRef}>
            <EditorContent
                editor={editor}
                className="[&_.ProseMirror]:mx-auto [&_.ProseMirror]:streaming-animation [&_.ProseMirror_h1]:w-fit [&_.ProseMirror_h2]:w-fit [&_.ProseMirror_h3]:w-fit [&_.ProseMirror_h4]:w-fit [&_.ProseMirror_h5]:w-fit [&_.ProseMirror_h6]:w-fit [&_.ProseMirror_li:not(:has(pre))]:w-fit"
            />

            {hoveredParagraph && (
                <div
                    ref={buttonRef}
                    className="absolute z-50"
                    style={{
                        top: buttonPosition.top + 'px',
                        left: buttonPosition.left + 'px',
                    }}
                    onMouseEnter={() => {
                        if (hideTimeoutRef.current) {
                            clearTimeout(hideTimeoutRef.current);
                        }
                    }}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full hover:bg-transparent p-0 transition-all duration-200 hover:scale-125 origin-center"
                        onClick={handlePlusClick}
                    >
                        <MessageCircle className="opacity-40 hover:opacity-100 transition-all duration-200" />
                    </Button>
                </div>
            )}
        </div>
    )
} 