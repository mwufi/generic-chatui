"use client";

import { useState, useEffect } from "react";
import { Agent, defaultAgents } from "@/app/types/agent";
import { AgentSelector } from "@/app/components/agent-selector";
import { ThemeableMessage } from "@/app/components/messages/themeable-message";
import { SingleChatInput } from "@/app/components/playground/input/single-chat-input";
import { useToast } from "@/hooks/use-toast"
import { useChat } from '@ai-sdk/react'

export default function AgentPlaygroundPage() {
    const [selectedAgent, setSelectedAgent] = useState<Agent>(defaultAgents[0]);
    const [customPrompt, setCustomPrompt] = useState<string>(defaultAgents[0].prompt);
    const { toast } = useToast();

    const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading } = useChat({
        api: "/api/chat",
        initialMessages: [
            {
                id: "system",
                role: "system" as const,
                content: customPrompt,
            }
        ],
        onResponse(response) {
            if (response.status === 401) {
                toast({
                    title: "Error",
                    description: "Unauthorized. Please check your credentials.",
                    variant: "destructive",
                });
            }
        },
        onError(error) {
            toast({
                title: "Error",
                description: "Failed to get response from AI. Please try again.",
                variant: "destructive",
            });
        },
    });

    // Update system message when agent changes
    useEffect(() => {
        const systemMessage = {
            id: "system",
            role: "system" as const,
            content: customPrompt,
        };

        console.log("systemMessage", systemMessage);

        // Keep existing chat messages but update the system message
        setMessages(prevMessages => {
            const chatMessages = prevMessages.filter(msg => msg.role !== "system");
            return [systemMessage, ...chatMessages];
        });
    }, [selectedAgent, customPrompt, setMessages]);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Agent Selector */}
                <div className="lg:col-span-1">
                    <AgentSelector
                        agents={defaultAgents}
                        selectedAgent={selectedAgent}
                        onAgentChange={setSelectedAgent}
                        onPromptChange={setCustomPrompt}
                    />
                </div>

                {/* Chat Interface */}
                <div className="lg:col-span-2 border rounded-lg bg-card overflow-hidden flex flex-col h-[calc(100vh-6rem)]">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {messages.slice(1).map((message) => (
                            <ThemeableMessage
                                key={message.id}
                                id={message.id}
                                role={message.role as "user" | "assistant"}
                                content={message.content}
                                theme="imessage"
                                isFirstInGroup={true}
                                isLastInGroup={true}
                            />
                        ))}
                        {isLoading && (
                            <ThemeableMessage
                                id="loading"
                                role="assistant"
                                content="..."
                                isLoading={true}
                                theme="imessage"
                                isFirstInGroup={true}
                                isLastInGroup={true}
                            />
                        )}
                    </div>

                    {/* Input */}
                    <div className="border-t p-4">
                        <SingleChatInput
                            value={input}
                            onChange={(value: string) => handleInputChange({ target: { value } } as any)}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(e);
                            }}
                            disabled={isLoading}
                            placeholder="Type a message..."
                            theme="default"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 