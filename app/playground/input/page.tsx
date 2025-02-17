"use client";

import { ChatInput } from "@/app/components/playground/input/chat-input";
import { useState } from "react";

export default function InputPlaygroundPage() {
    const [messages, setMessages] = useState<Array<{ content: string; files?: File[] }>>([]);

    const handleSend = (message: { content: string; files?: File[] }) => {
        setMessages([...messages, message]);
        console.log("Sent message:", message);
    };

    return (
        <div className="min-h-screen bg-background relative">
            {/* Messages Display */}
            <div className="pb-40">
                {messages.map((msg, index) => (
                    <div key={index} className="p-4 border-b">
                        <p className="font-medium">Message {index + 1}:</p>
                        <p className="mt-2">{msg.content}</p>
                        {msg.files && msg.files.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm text-muted-foreground">Attached Files:</p>
                                <ul className="list-disc list-inside">
                                    {msg.files.map((file, fileIndex) => (
                                        <li key={fileIndex} className="text-sm">
                                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <ChatInput onSend={handleSend} />
        </div>
    );
} 