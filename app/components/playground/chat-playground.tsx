"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChat, Message } from '@ai-sdk/react'
import { ThemeableMessage } from "../messages/themeable-message";
import { ChatToolbar } from "./chat-toolbar";
import { SystemMessageEditor, SystemBlockType } from "./system-message-editor";
import { SingleChatInput } from "./input/single-chat-input";

interface ModelConfig {
    model: string;
    responseFormat: string;
    temperature: number;
    maxTokens: number;
    stopSequences: string[];
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
    theme?: string;
}

interface Conversation {
    id: string;
    name: string;
    messages: Message[];
    systemMessage: string;
    config?: ModelConfig;
}

interface SystemBlock {
    id: string;
    type: SystemBlockType;
    content: string;
}

export function ChatPlayground({ saveConvo }: { saveConvo?: (convo: Conversation) => void }) {
    const [isSystemVisible, setIsSystemVisible] = useState(true);
    const [systemMessage, setSystemMessage] = useState("You are a helpful assistant.");
    const [systemBlocks, setSystemBlocks] = useState<SystemBlock[]>([{
        id: "default",
        type: "text",
        content: "You are a helpful assistant."
    }]);
    const [convoName, setConvoName] = useState("New Conversation");
    const [isJsonView, setIsJsonView] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [config, setConfig] = useState<ModelConfig>({
        model: "deepseek-chat",
        responseFormat: "text",
        temperature: 1.0,
        maxTokens: 2048,
        stopSequences: [],
        topP: 1.0,
        frequencyPenalty: 0.0,
        presencePenalty: 0.0,
        theme: "bumble"
    });

    const { messages, setMessages, input, handleInputChange, handleSubmit, status } = useChat({
        api: "/api/chat",
        initialMessages: [
            {
                id: "system",
                role: "system",
                content: systemMessage,
                parts: [{ type: "text", text: systemMessage }]
            }
        ],
        body: {
            config
        },
        onResponse(response) {
            // Optional: Handle streaming response
            if (response.status === 401) {
                console.error("Unauthorized");
            }
        },
        onFinish(message) {
            // Optional: Handle completion
            console.log("Chat completed", message);
        },
    });

    // Update system message when blocks change
    useEffect(() => {
        const newSystemMessage = systemBlocks
            .map(block => block.content)
            .filter(content => content.trim())
            .join("\n\n");
        setSystemMessage(newSystemMessage);

        // Also update the system message in the messages array
        if (messages.length > 0 && messages[0].role === 'system') {
            const updatedMessages = [...messages];
            updatedMessages[0] = {
                ...updatedMessages[0],
                content: newSystemMessage,
                parts: [{ type: "text", text: newSystemMessage }]
            };
            setMessages(updatedMessages);
        }
    }, [systemBlocks, messages, setMessages]);

    const handleMessageChange = (index: number, content: string) => {
        const newMessages = [...messages];
        newMessages[index] = {
            ...newMessages[index],
            content
        };
        setMessages(newMessages);
    };

    const handleDeleteMessage = (index: number) => {
        const newMessages = [...messages];
        newMessages.splice(index, 1);
        setMessages(newMessages);
    };

    const handleSaveConversation = () => {
        if (saveConvo) {
            const conversation: Conversation = {
                id: Date.now().toString(),
                name: convoName,
                messages: messages.map(msg => ({
                    id: msg.id,
                    role: msg.role as "system" | "user" | "assistant",
                    content: msg.content,
                    timestamp: msg.createdAt
                })),
                systemMessage,
                config
            };
            saveConvo(conversation);
        }
    };

    const toolbar = (
        <ChatToolbar
            convoName={convoName}
            onConvoNameChange={(name: string) => setConvoName(name)}
            isJsonView={isJsonView}
            onJsonViewToggle={() => setIsJsonView(!isJsonView)}
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            onSave={saveConvo ? handleSaveConversation : undefined}
            onClear={() => setMessages([messages[0]])}
            onExport={() => {
                const json = JSON.stringify(messages, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${convoName}.json`;
                a.click();
                URL.revokeObjectURL(url);
            }}
        />
    );

    const mainContent = (
        <div className="flex-1 flex flex-col min-w-0">
            {!isJsonView ? (
                <>
                    {/* System Message Editor */}
                    <div className="px-4 py-2">
                        <SystemMessageEditor
                            blocks={systemBlocks}
                            onBlocksChange={setSystemBlocks}
                            isVisible={isSystemVisible}
                            onVisibilityToggle={() => setIsSystemVisible(!isSystemVisible)}
                        />
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto min-h-0 w-full max-w-[44rem] mx-auto">
                        {messages.slice(1).map((message, index, arr) => {
                            const prevMessage = index > 0 ? arr[index - 1] : null;
                            const nextMessage = index < arr.length - 1 ? arr[index + 1] : null;
                            const isFirstInGroup = !prevMessage || prevMessage.role !== message.role;
                            const isLastInGroup = !nextMessage || nextMessage.role !== message.role;
                            const layout = config.theme === "slack" ? "linear" : "alternating";

                            // Ensure we only pass valid roles
                            const role = message.role === "system" || message.role === "user" || message.role === "assistant"
                                ? message.role
                                : "assistant";

                            return (
                                <ThemeableMessage
                                    key={message.id}
                                    {...message}
                                    role={role}
                                    theme={config.theme}
                                    isFirstInGroup={isFirstInGroup}
                                    isLastInGroup={isLastInGroup}
                                    layout={layout}
                                    onContentChange={(content: string) => handleMessageChange(index + 1, content)}
                                    onDelete={() => handleDeleteMessage(index + 1)}
                                    parts={message.parts?.filter(part =>
                                        part.type === "text" || part.type === "reasoning"
                                    )}
                                />
                            );
                        })}
                        {status === "submitted" && (
                            <ThemeableMessage
                                key="loading"
                                id="loading"
                                isLoading={true}
                                role="assistant"
                                content="..."
                                theme={config.theme}
                                isFirstInGroup={true}
                                isLastInGroup={true}
                                layout={config.theme === "slack" ? "linear" : "alternating"}
                            />
                        )}
                    </div>
                </>
            ) : (
                <div className="flex-1 p-4 overflow-hidden">
                    <div className="h-full overflow-auto">
                        <pre className="text-sm bg-secondary/5 p-4 rounded whitespace-pre-wrap break-words">
                            {JSON.stringify({
                                systemBlocks,
                                messages: messages.map(msg => ({
                                    role: msg.role as "system" | "user" | "assistant",
                                    content: msg.content
                                }))
                            }, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    )

    const sidebar = (
        <div className="p-4 flex flex-col gap-6">
            <div className="space-y-4">
                <h3 className="font-medium">Theme</h3>
                <div className="space-y-2">
                    <Select
                        value={config.theme}
                        onValueChange={(value: string) => setConfig(prev => ({ ...prev, theme: value }))}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="imessage">iMessage</SelectItem>
                            <SelectItem value="slack">Slack</SelectItem>
                            <SelectItem value="bumble">Bumble</SelectItem>
                            <SelectItem value="discord">Discord</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-medium">Model Configuration</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Model</label>
                        <Select value={config.model} onValueChange={(value: string) => setConfig(prev => ({ ...prev, model: value }))}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                                <SelectItem value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</SelectItem>
                                <SelectItem value="o1-mini">O1 Mini</SelectItem>
                                <SelectItem value="o1">O1</SelectItem>
                                <SelectItem value="gpt-4o-mini-realtime-preview">GPT-4 Mini</SelectItem>
                                <SelectItem value="o3-mini">O3 Mini</SelectItem>
                                <SelectItem value="deepseek-chat">DeepSeek V3</SelectItem>
                                <SelectItem value="deepseek-reasoner">DeepSeek R1</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Response format</label>
                        <Select value={config.responseFormat} onValueChange={(value: string) => setConfig(prev => ({ ...prev, responseFormat: value }))}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="text">text</SelectItem>
                                <SelectItem value="json">json</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-medium">Functions</h3>
                <Button variant="outline" className="w-full justify-start" onClick={() => { }}>
                    <span className="mr-2">+</span> Add
                </Button>
            </div>

            <div className="space-y-4">
                <h3 className="font-medium">Model parameters</h3>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm text-muted-foreground">Temperature</label>
                            <span className="text-sm text-muted-foreground">{config.temperature.toFixed(2)}</span>
                        </div>
                        <Slider
                            value={[config.temperature]}
                            max={2}
                            step={0.01}
                            onValueChange={([value]: number[]) => setConfig(prev => ({ ...prev, temperature: value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm text-muted-foreground">Maximum length</label>
                            <span className="text-sm text-muted-foreground">{config.maxTokens}</span>
                        </div>
                        <Slider
                            value={[config.maxTokens]}
                            max={4096}
                            step={1}
                            onValueChange={([value]: number[]) => setConfig(prev => ({ ...prev, maxTokens: value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm text-muted-foreground">Top P</label>
                            <span className="text-sm text-muted-foreground">{config.topP.toFixed(2)}</span>
                        </div>
                        <Slider
                            value={[config.topP]}
                            max={1}
                            step={0.01}
                            onValueChange={([value]: number[]) => setConfig(prev => ({ ...prev, topP: value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm text-muted-foreground">Frequency penalty</label>
                            <span className="text-sm text-muted-foreground">{config.frequencyPenalty.toFixed(2)}</span>
                        </div>
                        <Slider
                            value={[config.frequencyPenalty]}
                            max={2}
                            step={0.01}
                            onValueChange={([value]: number[]) => setConfig(prev => ({ ...prev, frequencyPenalty: value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm text-muted-foreground">Presence penalty</label>
                            <span className="text-sm text-muted-foreground">{config.presencePenalty.toFixed(2)}</span>
                        </div>
                        <Slider
                            value={[config.presencePenalty]}
                            max={2}
                            step={0.01}
                            onValueChange={([value]: number[]) => setConfig(prev => ({ ...prev, presencePenalty: value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Stop sequences</label>
                        <div className="text-sm text-muted-foreground">
                            Enter sequence and press Tab
                        </div>
                        <div className="text-xs text-muted-foreground">
                            0 / 4
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className={cn(
            "h-screen grid chat-container",
            `theme-${config.theme}`,
        )} style={{
            gridTemplateColumns: isSidebarOpen ? "1fr 320px" : "1fr",
        }}>
            <div className="flex flex-col h-full">
                <div className="p-2 shadow chat-toolbar">
                    {toolbar}
                </div>
                <div className="flex-1 flex flex-col relative min-h-0">
                    <div className="absolute inset-0 overflow-y-auto p-2 pb-40">
                        {mainContent}
                    </div>
                    {!isJsonView && (
                        <SingleChatInput
                            value={input}
                            onChange={(value) => handleInputChange({ target: { value } } as any)}
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("Submitting chat input:", input);
                                handleSubmit(e);
                            }}
                            disabled={status === "submitted"}
                            theme={config.theme}
                            placeholder="Type a message..."
                        />
                    )}
                </div>
            </div>

            <div className={cn(
                "border-l border-border bg-card overflow-y-auto",
                isSidebarOpen ? "display-block" : "hidden"
            )}>
                {sidebar}
            </div>
        </div>
    );
} 