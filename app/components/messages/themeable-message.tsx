"use client";

import { cn } from "@/lib/utils";
import { MoreHorizontal, Pencil, Trash2, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export interface ThemeableMessageProps {
    id: string;
    role: "system" | "user" | "assistant";
    content: string;
    parts?: Array<{
        type: "text" | "reasoning";
        text?: string;
        reasoning?: string;
    }>;
    isLoading?: boolean;
    timestamp?: Date;
    avatar?: string;
    username?: string;
    reactions?: Array<{
        emoji: string;
        count: number;
        userReacted?: boolean;
        effect?: "gentle" | "loud" | "slam" | "ha-ha";
    }>;
    theme?: string;
    className?: string;
    onContentChange?: (content: string) => void;
    onDelete?: () => void;
    isFirstInGroup?: boolean;
    isLastInGroup?: boolean;
    layout?: "alternating" | "linear";
}

export function ThemeableMessage({
    role,
    content,
    parts = [],
    isLoading,
    timestamp = new Date(),
    avatar,
    username = role === "assistant" ? "AI Assistant" : "User",
    theme = "default",
    reactions = [],
    onContentChange,
    onDelete,
    className,
    isFirstInGroup = true,
    isLastInGroup = true,
    layout = "alternating",
}: ThemeableMessageProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showReasoning, setShowReasoning] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);

    const hasReasoning = parts.some(part => part.type === "reasoning");

    const handleSave = () => {
        if (!contentRef.current) return;
        const newContent = contentRef.current.innerText;
        if (newContent !== content) {
            onContentChange?.(newContent);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSave();
            contentRef.current?.blur();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            if (contentRef.current) {
                contentRef.current.innerText = content;
                contentRef.current.blur();
            }
        }
    };

    return (
        <div
            className={cn(
                "message-container antialiased",
                `theme-${theme}`,
                role === "user" && "message-user",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Avatar */}
            <div className="message-avatar">
                {avatar ? (
                    <img src={avatar} alt={username} />
                ) : (
                    <div className="message-avatar-fallback">
                        {username[0].toUpperCase()}
                    </div>
                )}
            </div>
            <div className="w-full">
                {/* Header */}
                <div className="message-header">
                    <span className="message-username">{username}</span>
                    <span className="message-timestamp">
                        {timestamp.toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit"
                        })}
                    </span>
                </div>

                {/* note: flex-user is defined in the message-themes.scss file. keep this! */}
                <div className={cn(
                    "flex gap-2",
                    role === "user" ? "flex-user-direction" : "flex-row"
                )}>
                    {/* Message Bubble */}
                    <div className="message-bubble">
                        {isLoading ? (
                            <div className="message-loading">
                                <div className="loading-dot" />
                                <div className="loading-dot" />
                                <div className="loading-dot" />
                            </div>
                        ) : (
                            <>
                                <div
                                    ref={contentRef}
                                    className="message-text focus:outline-none"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleSave}
                                >
                                    {content}
                                </div>
                                {hasReasoning && showReasoning && (
                                    <div className="mt-2 p-2 bg-muted/50 rounded text-sm font-mono">
                                        {parts.map((part, index) => (
                                            part.type === "reasoning" && (
                                                <div key={index} className="whitespace-pre-wrap text-muted-foreground">
                                                    {part.reasoning}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Actions */}
                    <div className={cn(
                        "message-actions",
                        isHovered ? "opacity-100" : "opacity-0"
                    )}>
                        {hasReasoning && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "message-action-button",
                                    showReasoning && "bg-muted"
                                )}
                                onClick={() => setShowReasoning(!showReasoning)}
                                title={showReasoning ? "Hide reasoning" : "Show reasoning"}
                            >
                                <Brain className="h-4 w-4" />
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="message-action-button"
                            onClick={onDelete}
                            title="Delete message"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="message-action-button"
                            title="More actions"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                {/* Footer */}
                <div className="message-footer">
                    <div className="message-reactions">
                        {reactions.map((reaction, index) => (
                            <span key={index} className="message-reaction">
                                {reaction.emoji} {reaction.count}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 