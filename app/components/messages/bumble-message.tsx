"use client";

import { BumbleMessageProps } from "./types";
import { cn } from "@/lib/utils";
import { BadgeCheck, MapPin, Clock } from "lucide-react";

export function BumbleMessage({
    role,
    content,
    isLoading,
    timestamp = new Date(),
    avatar,
    showHeader = false,
    username = role === "assistant" ? "AI Assistant" : "You",
    isMatch = false,
    isVerified = false,
    distance,
    lastActive,
    isTyping = false,
}: BumbleMessageProps) {
    const isUser = role === "user";

    return (
        <div className={cn(
            "flex gap-3 max-w-[85%] px-4 py-2",
            isUser ? "ml-auto flex-row-reverse" : ""
        )}>
            {/* Avatar */}
            <div className="relative">
                <div className="w-10 h-10 rounded-full shrink-0 bg-[#FFC629] flex items-center justify-center text-background font-medium overflow-hidden">
                    {avatar ? (
                        <img src={avatar} alt={username} className="w-full h-full object-cover" />
                    ) : (
                        username[0].toUpperCase()
                    )}
                </div>
            </div>

            {/* Message Content */}
            <div className={cn(
                "flex flex-col max-w-[calc(100%-3rem)]",
                isUser && "items-end"
            )}>
                {/* User Info */}
                {!isUser && showHeader && (
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{username}</span>
                        {isMatch && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FFC629] text-background font-medium">
                                Match!
                            </span>
                        )}
                        {distance && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {distance}
                            </span>
                        )}
                        {lastActive && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {lastActive}
                            </span>
                        )}
                    </div>
                )}

                {/* Message Bubble */}
                <div className={cn(
                    "relative rounded-2xl px-4 py-2 text-sm min-h-[2.5rem] min-w-[4rem] group",
                    isUser ? (
                        "bg-[#FFC629] text-background rounded-tr-sm"
                    ) : (
                        "bg-secondary text-secondary-foreground rounded-tl-sm"
                    ),
                    isLoading && "animate-pulse bg-muted/50"
                )}>
                    {isLoading || isTyping ? (
                        <div className="flex gap-1 py-2 px-1">
                            <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                            <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                            <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                        </div>
                    ) : (
                        <div className="whitespace-pre-wrap break-words">{content}</div>
                    )}
                </div>

                {/* Timestamp */}
                {!isLoading && (
                    <div className="text-[10px] text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                    </div>
                )}
            </div>
        </div>
    );
} 