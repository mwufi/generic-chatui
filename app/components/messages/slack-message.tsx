"use client";

import { useState } from "react";
import { SlackMessageProps } from "./types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquare, Pin, Smile, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SlackMessage({
    role,
    content,
    isLoading,
    timestamp = new Date(),
    avatar,
    username = role === "assistant" ? "AI Assistant" : "User",
    reactions = [],
    threadCount = 0,
    isPinned = false,
    isEdited = false,
    onContentChange,
    onDelete,
}: SlackMessageProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const handleContentChange = () => {
        if (editedContent !== content) {
            onContentChange?.(editedContent);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleContentChange();
        } else if (e.key === "Escape") {
            setIsEditing(false);
            setEditedContent(content);
        }
    };

    return (
        <div
            className="group px-4 py-2 hover:bg-secondary/5 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded shrink-0 bg-secondary/80 flex items-center justify-center text-secondary-foreground font-medium">
                    {avatar ? (
                        <img src={avatar} alt={username} className="w-full h-full rounded" />
                    ) : (
                        username[0].toUpperCase()
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{username}</span>
                        <span className="text-xs text-muted-foreground">
                            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {isPinned && (
                            <Pin className="w-3 h-3 text-muted-foreground" />
                        )}
                        {isEdited && (
                            <span className="text-xs text-muted-foreground">(edited)</span>
                        )}
                    </div>

                    {/* Message */}
                    {isEditing ? (
                        <div className="relative">
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                onBlur={handleContentChange}
                                onKeyDown={handleKeyDown}
                                className="w-full p-2 rounded border bg-background resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                                rows={editedContent.split('\n').length}
                                autoFocus
                            />
                            <div className="text-xs text-muted-foreground mt-1">
                                Press Enter to save, Esc to cancel
                            </div>
                        </div>
                    ) : (
                        <div className="whitespace-pre-wrap break-words">{content}</div>
                    )}

                    {/* Actions */}
                    <div className="mt-2 flex items-center gap-3">
                        {/* Reactions */}
                        <div className="flex gap-1">
                            {reactions.map((reaction, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "h-6 px-2 text-xs rounded-full",
                                        reaction.userReacted && "bg-primary/10 text-primary"
                                    )}
                                >
                                    {reaction.emoji} {reaction.count}
                                </Button>
                            ))}
                        </div>

                        {/* Thread */}
                        {threadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                            >
                                <MessageSquare className="w-3 h-3 mr-1" />
                                {threadCount} {threadCount === 1 ? "reply" : "replies"}
                            </Button>
                        )}

                        {/* Hover Actions */}
                        <div className={cn(
                            "flex items-center gap-1 transition-opacity",
                            isHovered ? "opacity-100" : "opacity-0"
                        )}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => { }}
                            >
                                <Smile className="w-3 h-3" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => { }}
                            >
                                <MessageSquare className="w-3 h-3" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                    >
                                        <MoreHorizontal className="w-3 h-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => setIsEditing(true)}
                                        className="gap-2"
                                    >
                                        <Pencil className="w-4 h-4" /> Edit message
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={onDelete}
                                        className="gap-2 text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete message
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 