"use client";

import { IMessageProps } from "./types";
import { cn } from "@/lib/utils";
import { Heart, ThumbsUp, ThumbsDown, MessageCircle, AlertCircle, HelpCircle } from "lucide-react";

export function IMessage({
    role,
    content,
    isLoading,
    timestamp = new Date(),
    reactions = [],
    tapback,
    subject,
    isDelivered = true,
    hasReadReceipt = false,
}: IMessageProps) {
    const isUser = role === "user";

    const getTapbackIcon = (type: string) => {
        switch (type) {
            case "heart":
                return <Heart className="w-3 h-3 fill-current" />;
            case "thumbsUp":
                return <ThumbsUp className="w-3 h-3" />;
            case "thumbsDown":
                return <ThumbsDown className="w-3 h-3" />;
            case "ha-ha":
                return <MessageCircle className="w-3 h-3" />;
            case "exclamation":
                return <AlertCircle className="w-3 h-3" />;
            case "question":
                return <HelpCircle className="w-3 h-3" />;
            default:
                return null;
        }
    };

    return (
        <div className={cn(
            "flex flex-col gap-1 max-w-[70%] px-4 py-1",
            isUser ? "ml-auto items-end" : "mr-auto items-start"
        )}>
            {/* Subject */}
            {subject && !isLoading && (
                <div className="text-xs font-medium text-muted-foreground mb-1">
                    {subject}
                </div>
            )}

            {/* Message Container */}
            <div className="relative group">
                {/* Message Bubble */}
                <div className={cn(
                    "relative px-4 py-2 rounded-2xl text-sm min-h-[2.5rem] min-w-[4rem]",
                    isUser ? (
                        "bg-[#0A84FF] text-white rounded-tr-sm"
                    ) : (
                        "bg-secondary text-secondary-foreground rounded-tl-sm"
                    ),
                    isLoading && "animate-pulse bg-muted/50"
                )}>
                    {isLoading ? (
                        <div className="flex flex-col gap-2">
                            <div className="h-2 bg-muted rounded w-24" />
                            <div className="h-2 bg-muted rounded w-16" />
                        </div>
                    ) : (
                        <div className="whitespace-pre-wrap break-words">{content}</div>
                    )}

                    {/* Tapback */}
                    {tapback && !isLoading && (
                        <div className={cn(
                            "absolute -top-2 flex items-center justify-center",
                            "h-5 px-1 rounded-full bg-background border shadow-sm",
                            isUser ? "-left-1" : "-right-1"
                        )}>
                            {getTapbackIcon(tapback)}
                        </div>
                    )}

                    {/* Reactions with Effects */}
                    {reactions && reactions.length > 0 && !isLoading && (
                        <div className={cn(
                            "absolute -bottom-2 flex -space-x-1",
                            isUser ? "left-0" : "right-0"
                        )}>
                            {reactions.map((reaction, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "w-5 h-5 flex items-center justify-center",
                                        "rounded-full bg-background border shadow-sm",
                                        reaction.effect === "gentle" && "animate-bounce",
                                        reaction.effect === "loud" && "animate-ping",
                                        reaction.effect === "slam" && "animate-bounce scale-125",
                                        reaction.effect === "ha-ha" && "animate-spin"
                                    )}
                                >
                                    {reaction.emoji}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Delivery Status */}
                {isUser && !isLoading && (
                    <div className={cn(
                        "text-[10px] mt-1",
                        hasReadReceipt ? "text-[#0A84FF]" : "text-muted-foreground"
                    )}>
                        {hasReadReceipt ? (
                            "Read"
                        ) : isDelivered ? (
                            "Delivered"
                        ) : (
                            "Sent"
                        )}
                        {" · "}
                        {timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                    </div>
                )}
            </div>
        </div>
    );
} 