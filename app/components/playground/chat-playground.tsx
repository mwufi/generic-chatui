"use client";

import { useState, useRef } from "react";
import { MessageBlock } from "./message-block";
import { Message } from "@/app/api/oai/completion/route";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Save, Code, Loader2, Settings, History, Eraser, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelConfig {
    model: string;
    responseFormat: string;
    temperature: number;
    maxTokens: number;
    stopSequences: string[];
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
}

interface Conversation {
    id: string;
    name: string;
    messages: Message[];
    systemMessage: string;
    config?: ModelConfig;
}

export function ChatPlayground({ saveConvo }: { saveConvo?: (convo: Conversation) => void }) {
    const [isSystemVisible, setIsSystemVisible] = useState(true);
    const [systemMessage, setSystemMessage] = useState("You are a helpful assistant.");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [convoName, setConvoName] = useState("New Conversation");
    const [isJsonView, setIsJsonView] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [config, setConfig] = useState<ModelConfig>({
        model: "gpt-4",
        responseFormat: "text",
        temperature: 1.0,
        maxTokens: 2048,
        stopSequences: [],
        topP: 1.0,
        frequencyPenalty: 0.0,
        presencePenalty: 0.0
    });

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
                systemMessage,
                config
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
        systemMessage,
        config
    };

    return (
        <div className="flex h-full">
            <div className="flex-1 flex flex-col h-full max-w-full overflow-hidden">
                {/* Toolbar */}
                <div className="h-12 px-4 flex items-center justify-between gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex items-center gap-2">
                        <Input
                            value={convoName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConvoName(e.target.value)}
                            className="max-w-[300px] h-8 bg-transparent"
                            placeholder="Untitled conversation"
                        />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eraser className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsJsonView(!isJsonView)}
                            className={cn("h-8 w-8", isJsonView && "text-primary")}
                        >
                            <Code className="h-4 w-4" />
                        </Button>
                        {saveConvo && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleSaveConversation}
                                className="h-8 w-8"
                            >
                                <Save className="h-4 w-4" />
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={cn("h-8 w-8", isSidebarOpen && "text-primary")}
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex flex-col min-w-0">
                        {!isJsonView ? (
                            <>
                                {/* System Message */}
                                <div className="px-4 py-2">
                                    <div
                                        className={cn(
                                            "rounded-lg transition-all duration-200",
                                            isSystemVisible ? "bg-secondary/40 shadow-sm" : "bg-transparent"
                                        )}
                                    >
                                        <button
                                            className="w-full px-4 py-2 flex items-center gap-2 text-sm"
                                            onClick={() => setIsSystemVisible(!isSystemVisible)}
                                        >
                                            <span className={cn(
                                                "transition-transform duration-200",
                                                isSystemVisible ? "rotate-0" : "-rotate-90"
                                            )}>
                                                <ChevronDown className="h-4 w-4" />
                                            </span>
                                            System message
                                        </button>
                                        {isSystemVisible && (
                                            <div className="px-4 pb-3 animate-in slide-in-from-top-2 duration-200">
                                                <input
                                                    type="text"
                                                    value={systemMessage}
                                                    onChange={(e) => setSystemMessage(e.target.value)}
                                                    className="w-full bg-transparent outline-none text-sm"
                                                    placeholder="Set the AI's behavior and context..."
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto min-h-0">
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
                                <div className="p-4 flex gap-2 items-end">
                                    <div className="flex-1 flex items-center gap-2 min-w-0">
                                        <div className="shrink-0 min-w-[4rem] px-2 py-1 bg-secondary/40 rounded text-sm">
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

                    {/* Right Sidebar */}
                    <div className={cn(
                        "w-80 border-l border-border bg-card transition-all duration-300 overflow-y-auto",
                        isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    )}>
                        <div className="p-4 flex flex-col gap-6">
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
                                                <SelectItem value="gpt-4">gpt-4</SelectItem>
                                                <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
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
                    </div>
                </div>
            </div>
        </div>
    );
} 