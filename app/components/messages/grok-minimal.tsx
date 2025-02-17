"use client";

import { GrokMinimalMessageProps } from "./types";
import { cn } from "@/lib/utils";
import { Copy, RefreshCcw, Share, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GrokMinimal({
    role,
    content,
    isLoading,
    responseTime,
    actions,
}: GrokMinimalMessageProps) {
    const isUser = role === "user";

    return (
        <div className={cn(
            "relative group flex flex-col justify-center w-full max-w-3xl md:px-4 pb-2 message-row",
            isUser ? "items-end" : "items-start"
        )}>
            {/* Message Content */}
            <div className={cn(
                "rounded-3xl prose dark:prose-invert break-words min-h-7",
                "prose-p:opacity-95 prose-strong:opacity-100",
                isUser ? (
                    "bg-primary/10 text-primary-foreground max-w-[100%] sm:max-w-[90%] px-4 py-2.5 rounded-br-lg"
                ) : (
                    "text-foreground w-full max-w-none"
                ),
                isLoading && "animate-pulse bg-muted/50"
            )}>
                {isLoading ? (
                    <div className="flex flex-col gap-2 py-1">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                ) : isUser ? (
                    <span className="whitespace-pre-wrap">{content}</span>
                ) : (
                    <div className="prose dark:prose-invert max-w-none">
                        {content.split('\n').map((paragraph, index) => (
                            <p key={index} className="break-words whitespace-pre-wrap text-foreground/90">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className={cn(
                "flex items-center gap-[2px] w-max opacity-0 group-focus-within:opacity-100",
                "group-hover:opacity-100 transition-opacity rounded-lg text-xs bg-background/80 backdrop-blur pt-2 px-2",
                isUser ? "end-4 -mr-2" : "start-0 md:start-3 -ml-4"
            )}>
                {/* User Message Actions */}
                {isUser && !isLoading && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                            onClick={() => { }}
                        >
                            <span className="sr-only">Edit message</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="size-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                <path d="m15 5 3 3" />
                            </svg>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                            onClick={actions?.onCopy}
                        >
                            <span className="sr-only">Copy message</span>
                            <Copy className="size-4" />
                        </Button>
                    </>
                )}

                {/* Assistant Message Actions */}
                {!isUser && !isLoading && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                            onClick={actions?.onRegenerate}
                        >
                            <span className="sr-only">Regenerate response</span>
                            <RefreshCcw className="size-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                            onClick={actions?.onCopy}
                        >
                            <span className="sr-only">Copy response</span>
                            <Copy className="size-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                            onClick={actions?.onShare}
                        >
                            <span className="sr-only">Share response</span>
                            <Share className="size-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                            onClick={actions?.onLike}
                        >
                            <span className="sr-only">Like response</span>
                            <ThumbsUp className="size-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                            onClick={actions?.onDislike}
                        >
                            <span className="sr-only">Dislike response</span>
                            <ThumbsDown className="size-4" />
                        </Button>
                        {responseTime && (
                            <div className="text-muted-foreground px-1">{responseTime}</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
} 