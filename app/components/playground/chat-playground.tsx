"use client";

import { useState, useRef } from "react";
import { MessageBlock } from "./message-block";
import { Message } from "@/app/api/oai/completion/route";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Save, Code, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Conversation {
    id: string;
    name: string;
    messages: Message[];
    systemMessage: string;
}

export function ChatPlayground({ saveConvo }: { saveConvo?: (convo: Conversation) => void }) {
    const [isSystemVisible, setIsSystemVisible] = useState(true);
    const [systemMessage, setSystemMessage] = useState("You are a helpful assistant.");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [convoName, setConvoName] = useState("New Conversation");
    const [isJsonView, setIsJsonView] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = async () => {
        if (!currentMessage.trim()) return;

        const newMessage: Message = {
            role: "user",
            content: [{ type: "text", text: currentMessage }]
        };

        setMessages(prev => [...prev, newMessage]);
        setCurrentMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/oai/completion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: [{ type: "text", text: systemMessage }] },
                        ...messages,
                        newMessage
                    ],
                }),
            });

            if (!response.ok) throw new Error("Failed to get completion");

            const data = await response.json();
            console.log("Response data:", data);

            const assistantMessage: Message = {
                role: "assistant",
                content: [{
                    type: "text",
                    text: data.message.content
                }]
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleMessageChange = (index: number, content: string) => {
        setMessages(prev => prev.map((msg, i) =>
            i === index ? {
                ...msg,
                content: [{ type: "text", text: content }]
            } : msg
        ));
    };

    const handleDeleteMessage = (index: number) => {
        setMessages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSaveConversation = () => {
        if (saveConvo) {
            const conversation: Conversation = {
                id: Date.now().toString(),
                name: convoName,
                messages,
                systemMessage
            };
            saveConvo(conversation);
        }
    };

    const conversation: Conversation = {
        id: Date.now().toString(),
        name: convoName,
        messages: [
            { role: "system", content: [{ type: "text", text: systemMessage }] },
            ...messages
        ],
        systemMessage
    };

    return (
        <div className="flex flex-col h-full max-w-full overflow-hidden">
            {/* Header with name and save */}
            <div className="border-b p-4 flex items-center gap-4 shrink-0">
                <Input
                    value={convoName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConvoName(e.target.value)}
                    className="max-w-[300px]"
                />
                <div className="flex items-center gap-2 shrink-0">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsJsonView(!isJsonView)}
                        className={cn(isJsonView && "text-primary")}
                    >
                        <Code className="h-4 w-4" />
                    </Button>
                    {saveConvo && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleSaveConversation}
                        >
                            <Save className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {!isJsonView ? (
                <>
                    {/* System Message Header */}
                    <div className="border-b shrink-0">
                        <button
                            className="w-full px-4 py-2 flex items-center gap-2 hover:bg-secondary/10 text-sm"
                            onClick={() => setIsSystemVisible(!isSystemVisible)}
                        >
                            {isSystemVisible ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            System message
                        </button>
                        {isSystemVisible && (
                            <div className="px-4 py-2">
                                <input
                                    type="text"
                                    value={systemMessage}
                                    onChange={(e) => setSystemMessage(e.target.value)}
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>
                        )}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto min-h-0 divide-y">
                        {messages.map((message, index) => (
                            <MessageBlock
                                key={index}
                                role={message.role}
                                content={message.content[0].text || ""}
                                isLoading={false}
                                onContentChange={(content) => handleMessageChange(index, content)}
                                onDelete={() => handleDeleteMessage(index)}
                            />
                        ))}
                        {isLoading && (
                            <MessageBlock
                                role="assistant"
                                content=""
                                isLoading={true}
                            />
                        )}
                    </div>

                    {/* Input Bar */}
                    <div className="border-t p-4 flex gap-2 items-end shrink-0">
                        <div className="flex-1 flex items-center gap-2 min-w-0">
                            <div className="shrink-0 min-w-[4rem] px-2 py-1 bg-secondary/10 rounded text-sm">
                                User
                            </div>
                            <textarea
                                ref={inputRef}
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter user message..."
                                className="flex-1 bg-transparent outline-none resize-none py-1 min-w-0"
                                rows={1}
                                disabled={isLoading}
                            />
                        </div>
                        <Button
                            onClick={handleSend}
                            className={cn(
                                "shrink-0",
                                isLoading ? "bg-primary/80" : "bg-primary hover:bg-primary/90"
                            )}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Run"
                            )}
                        </Button>
                    </div>
                </>
            ) : (
                <div className="flex-1 p-4 overflow-hidden">
                    <div className="h-full overflow-auto">
                        <pre className="text-sm bg-secondary/5 p-4 rounded whitespace-pre-wrap break-words">
                            {JSON.stringify(conversation, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
} 