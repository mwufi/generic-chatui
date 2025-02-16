"use client";

import { useState, useEffect } from "react";
import { Copy, Image, Code, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type MessageBlockProps = {
    role: "system" | "user" | "assistant";
    content: string;
    isLoading?: boolean;
    onContentChange?: (content: string) => void;
    onDelete?: () => void;
};

export function MessageBlock({ role, content, isLoading, onContentChange, onDelete }: MessageBlockProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);
    const [isJsonView, setIsJsonView] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isLoading) {
            const startTime = Date.now();
            interval = setInterval(() => {
                setElapsedTime((Date.now() - startTime) / 1000);
            }, 100);
        } else {
            setElapsedTime(0);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleContentChange = () => {
        if (editedContent !== content) {
            onContentChange?.(editedContent);
        }
        setIsEditing(false);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(isJsonView ?
                JSON.stringify({ role, content: [{ type: "text", text: content }] }, null, 2) :
                content
            );
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const messageJson = {
        role,
        content: [{ type: "text", text: content }]
    };

    return (
        <div
            className={cn(
                "group relative px-4 py-3 transition-all",
                isHovered && "bg-secondary/5"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Role Label */}
            <div className="text-sm text-muted-foreground mb-2 capitalize flex items-center gap-2">
                <span>{role}</span>
                {isLoading && (
                    <span className="text-xs">
                        {elapsedTime.toFixed(1)}s
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="rounded-md w-full max-w-full">
                {isLoading ? (
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <div className="animate-pulse flex gap-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-current" />
                            <span className="inline-block w-1 h-1 rounded-full bg-current" />
                            <span className="inline-block w-1 h-1 rounded-full bg-current" />
                        </div>
                        <span className="text-sm">AI is thinking</span>
                    </div>
                ) : isJsonView ? (
                    <div className="text-sm bg-secondary/5 p-2 rounded">
                        <pre className="overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                            {JSON.stringify(messageJson, null, 2)}
                        </pre>
                    </div>
                ) : (
                    <div
                        className={cn(
                            "whitespace-pre-wrap outline-none max-w-full break-words",
                            isEditing && "ring-1 ring-primary p-2 rounded"
                        )}
                        contentEditable={isEditing}
                        onBlur={handleContentChange}
                        onInput={(e) => setEditedContent(e.currentTarget.textContent || "")}
                        suppressContentEditableWarning
                    >
                        {content}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className={cn(
                "absolute right-4 top-3 flex items-center gap-1 transition-opacity z-10",
                !isHovered && "opacity-0"
            )}>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                    className={cn(isEditing && "text-primary")}
                    disabled={isJsonView}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M16.793 2.793a3.121 3.121 0 1 1 4.414 4.414l-8.5 8.5A1 1 0 0 1 12 16H9a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707l8.5-8.5Zm3 1.414a1.121 1.121 0 0 0-1.586 0L10 12.414V14h1.586l8.207-8.207a1.121 1.121 0 0 0 0-1.586Z" clipRule="evenodd" />
                    </svg>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsJsonView(!isJsonView)}
                    className={cn(isJsonView && "text-primary")}
                >
                    <Code className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onDelete}>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </Button>
                {role === "user" && (
                    <Button variant="ghost" size="icon">
                        <Image className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
} 