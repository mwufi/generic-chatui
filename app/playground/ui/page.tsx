"use client";

import { useState } from "react";
import { SlackMessage } from "@/app/components/messages/slack-message";
import { MessengerMessage } from "@/app/components/messages/messenger-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MessageStyle = "slack" | "messenger";

export default function MessageTestPage() {
    const [role, setRole] = useState<"system" | "user" | "assistant">("user");
    const [content, setContent] = useState("Hello, this is a test message!");
    const [isLoading, setIsLoading] = useState(false);
    const [style, setStyle] = useState<MessageStyle>("slack");

    // Example data
    const slackReactions = [
        { emoji: "👍", count: 3, userReacted: true },
        { emoji: "🎉", count: 1, userReacted: false },
    ];

    const messengerReactions = [
        { emoji: "❤️", userId: "1" },
        { emoji: "👍", userId: "2" },
    ];

    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="prose">
                <h1>Message Components Test Page</h1>
                <p>Test different message components and their variations.</p>
            </div>

            {/* Controls */}
            <div className="space-y-4 p-4 border rounded-lg bg-card">
                <h2 className="text-lg font-semibold">Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Style</label>
                        <Select value={style} onValueChange={(value: MessageStyle) => setStyle(value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="slack">Slack</SelectItem>
                                <SelectItem value="messenger">Messenger</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Role</label>
                        <Select value={role} onValueChange={(value: "system" | "user" | "assistant") => setRole(value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="system">System</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="assistant">Assistant</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Content</label>
                        <Input
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter message content..."
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsLoading(!isLoading)}
                    >
                        Toggle Loading
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setContent("");
                            setRole("user");
                            setIsLoading(false);
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Preview</h2>
                <div className="border rounded-lg overflow-hidden">
                    {style === "slack" ? (
                        <SlackMessage
                            role={role}
                            content={content}
                            isLoading={isLoading}
                            reactions={slackReactions}
                            threadCount={2}
                            isPinned={true}
                            isEdited={false}
                            onContentChange={setContent}
                            onDelete={() => setContent("")}
                        />
                    ) : (
                        <MessengerMessage
                            role={role}
                            content={content}
                            isLoading={isLoading}
                            reactions={messengerReactions}
                            isRead={true}
                            isSent={true}
                            isDelivered={true}
                        />
                    )}
                </div>
            </div>

            {/* Examples */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Examples</h2>
                <Tabs defaultValue="slack">
                    <TabsList>
                        <TabsTrigger value="slack">Slack Style</TabsTrigger>
                        <TabsTrigger value="messenger">Messenger Style</TabsTrigger>
                    </TabsList>
                    <TabsContent value="slack" className="border rounded-lg mt-4">
                        <SlackMessage
                            role="system"
                            content="You are a helpful assistant."
                            isLoading={false}
                        />
                        <SlackMessage
                            role="user"
                            content="What's the weather like today?"
                            isLoading={false}
                            reactions={slackReactions}
                            threadCount={2}
                        />
                        <SlackMessage
                            role="assistant"
                            content="I apologize, but I don't have access to real-time weather information. To get accurate weather information for your location, I recommend checking a weather website or app, or looking outside!"
                            isLoading={false}
                            isPinned={true}
                        />
                        <SlackMessage
                            role="assistant"
                            content=""
                            isLoading={true}
                        />
                    </TabsContent>
                    <TabsContent value="messenger" className="space-y-2 border rounded-lg p-4 mt-4">
                        <MessengerMessage
                            role="user"
                            content="Hey! How are you?"
                            isRead={true}
                            reactions={[{ emoji: "👋", userId: "2" }]}
                        />
                        <MessengerMessage
                            role="assistant"
                            content="I'm doing great! How can I help you today?"
                        />
                        <MessengerMessage
                            role="user"
                            content="Can you help me with my project?"
                            isRead={false}
                            isDelivered={true}
                        />
                        <MessengerMessage
                            role="assistant"
                            content=""
                            isLoading={true}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
} 