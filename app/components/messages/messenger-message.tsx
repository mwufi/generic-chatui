"use client";

import { MessengerMessageProps } from "./types";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";

export function MessengerMessage({
    role,
    content,
    isLoading,
    timestamp = new Date(),
    avatar,
    username,
    isRead = false,
    isSent = true,
    isDelivered = true,
    reactions = [],
}: MessengerMessageProps) {
    const isUser = role === "user";

    return (
        <div className={cn(
            "flex gap-2 px-4 py-1 max-w-[85%] group",
            isUser ? "ml-auto flex-row-reverse" : ""
        )}>
            {/* Avatar */}
            {!isUser && (
                <div className="w-8 h-8 rounded-full shrink-0 bg-secondary/80 flex items-center justify-center text-secondary-foreground font-medium">
                    {avatar ? (
                        <img src={avatar} alt={username} className="w-full h-full rounded-full" />
                    ) : (
                        username?.[0].toUpperCase() || "A"
                    )}
                </div>
            )}

            {/* Message Content */}
            <div className={cn(
                "relative rounded-2xl px-3 py-2 text-sm",
                isUser ? "bg-primary text-primary-foreground" : "bg-secondary",
                isLoading && "animate-pulse"
            )}>
                {content}

                {/* Reactions */}
                {reactions.length > 0 && (
                    <div className={cn(
                        "absolute -bottom-2 flex -space-x-1 bg-background rounded-full px-1 py-0.5 shadow-sm border",
                        isUser ? "left-2" : "right-2"
                    )}>
                        {reactions.map((reaction, index) => (
                            <div key={index} className="w-4 h-4 flex items-center justify-center">
                                {reaction.emoji}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Indicators */}
            {isUser && (
                <div className="self-end mb-1 flex flex-col items-end">
                    <div className="text-[10px] text-muted-foreground">
                        {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <div className="text-muted-foreground">
                        {isRead ? (
                            <CheckCheck className="w-3 h-3 text-primary" />
                        ) : isDelivered ? (
                            <CheckCheck className="w-3 h-3" />
                        ) : isSent ? (
                            <Check className="w-3 h-3" />
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
} 