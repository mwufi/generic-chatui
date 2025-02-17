"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/components/messages/types";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface ThemeableMessageProps {
    id: string;
    role: "system" | "user" | "assistant";
    content: string;
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
    showAvatar?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
    showActions?: boolean;
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
    isLoading,
    timestamp = new Date(),
    avatar,
    username = role === "assistant" ? "AI Assistant" : "User",
    theme = "default",
    showAvatar = true,
    showHeader = true,
    showFooter = true,
    showActions = true,
    reactions = [],
    onContentChange,
    onDelete,
    className,
    isFirstInGroup = true,
    isLastInGroup = true,
    layout = "alternating",
}: ThemeableMessageProps) {
    const [isHovered, setIsHovered] = useState(false);
    const isUser = role === "user";

    return (
        <div
            className={cn(
                "message-container",
                `theme-${theme}`,
                `layout-${layout}`,
                isUser && "message-user",
                isFirstInGroup && "message-first-in-group",
                isLastInGroup && "message-last-in-group",
                !isFirstInGroup && "message-consecutive",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Avatar - Only show for first message in group */}
            {showAvatar && isFirstInGroup && (
                <div className="message-avatar">
                    {avatar ? (
                        <img src={avatar} alt={username} />
                    ) : (
                        <div className="message-avatar-fallback">
                            {username[0].toUpperCase()}
                        </div>
                    )}
                </div>
            )}

            {/* Content Area */}
            <div className="message-content">
                {/* Header - Only show for first message in group */}
                {showHeader && isFirstInGroup && (
                    <div className="message-header">
                        <span className="message-username">{username}</span>
                        <span className="message-timestamp">
                            {timestamp.toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit"
                            })}
                        </span>
                    </div>
                )}

                {/* Message Bubble */}
                <div className="message-bubble">
                    {isLoading ? (
                        <div className="message-loading">
                            <div className="loading-dot" />
                            <div className="loading-dot" />
                            <div className="loading-dot" />
                        </div>
                    ) : (
                        <div className="message-text">{content}</div>
                    )}
                </div>

                {/* Footer - Only show for last message in group */}
                {showFooter && isLastInGroup && (
                    <div className="message-footer">
                        {/* Reactions */}
                        {reactions.length > 0 && (
                            <div className="message-reactions">
                                {reactions.map((reaction, index) => (
                                    <span key={index} className="message-reaction">
                                        {reaction.emoji} {reaction.count}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Actions */}
                        {showActions && (
                            <div className={cn(
                                "message-actions",
                                isHovered ? "message-actions-visible" : "message-actions-hidden"
                            )}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="message-action-button"
                                    onClick={() => onContentChange?.(content)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="message-action-button"
                                    onClick={onDelete}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="message-action-button"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 