"use client";

import { useState, useEffect } from "react";
import { Copy, Image, Code, Loader2, Pencil, Trash2 } from "lucide-react";
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
                "group relative px-6 py-6 transition-all duration-200",
                isHovered && "bg-secondary/20",
                role === "assistant" && "bg-secondary/5"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Role Label */}
            <div className="text-sm text-muted-foreground mb-1.5 flex items-center gap-2">
                <span className="capitalize">{role}</span>
                {isLoading && elapsedTime > 3.5 && (
                    <span className="text-xs font-medium">
                        {elapsedTime.toFixed(1)}s
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="rounded-md w-full max-w-full">
                {isLoading ? (
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm font-medium">AI is thinking</span>
                    </div>
                ) : isJsonView ? (
                    <div className="text-sm bg-secondary/20 p-3 rounded-lg">
                        <pre className="overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                            {JSON.stringify(messageJson, null, 2)}
                        </pre>
                    </div>
                ) : (
                    <div
                        className={cn(
                            "whitespace-pre-wrap outline-none max-w-full break-words",
                            isEditing && "ring-1 ring-primary p-2 rounded-lg bg-secondary/10"
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
                "absolute right-6 top-6 flex items-center gap-1 transition-all duration-200",
                !isHovered && "opacity-0 translate-x-2"
            )}>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                    className={cn("h-8 w-8", isEditing && "text-primary bg-primary/10")}
                    disabled={isJsonView}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsJsonView(!isJsonView)}
                    className={cn("h-8 w-8", isJsonView && "text-primary bg-primary/10")}
                >
                    <Code className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                </Button>
                {role === "user" && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Image className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
} 