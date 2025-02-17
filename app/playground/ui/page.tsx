"use client";

import { useState } from "react";
import { SlackMessage } from "@/app/components/messages/slack-message";
import { MessengerMessage } from "@/app/components/messages/messenger-message";
import { IMessage } from "@/app/components/messages/imessage";
import { BumbleMessage } from "@/app/components/messages/bumble-message";
import { GrokMinimal } from "@/app/components/messages/grok-minimal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LONG_CONVERSATION } from "./sample-conversation";

type MessageStyle = "slack" | "messenger" | "imessage" | "bumble" | "grok";
type IMessageEffect = "gentle" | "loud" | "slam" | "ha-ha";


export default function MessageTestPage() {
    const [role, setRole] = useState<"system" | "user" | "assistant">("user");
    const [content, setContent] = useState("Hello, this is a test message!");
    const [isLoading, setIsLoading] = useState(false);
    const [style, setStyle] = useState<MessageStyle>("grok");
    const [showReactionControls, setShowReactionControls] = useState(false);
    const [showMessageControls, setShowMessageControls] = useState(false);

    // Message-specific state
    const [threadCount, setThreadCount] = useState(0);
    const [tapback, setTapback] = useState<string | undefined>();
    const [distance, setDistance] = useState<string>("");
    const [lastActive, setLastActive] = useState<string>("");
    const [isVerified, setIsVerified] = useState(false);
    const [isMatch, setIsMatch] = useState(false);

    // Reactions state
    const [slackReactions, setSlackReactions] = useState([
        { emoji: "👍", count: 3, userReacted: true },
        { emoji: "🎉", count: 1, userReacted: false },
    ]);

    const messengerReactions = [
        { emoji: "❤️", userId: "1" },
        { emoji: "👍", userId: "2" },
    ];

    const iMessageReactions: Array<{ emoji: string; effect?: IMessageEffect }> = [
        { emoji: "❤️", effect: "gentle" },
        { emoji: "👍", effect: "loud" },
        { emoji: "😂", effect: "ha-ha" },
    ];

    const renderMessage = (props: any) => {
        switch (style) {
            case "slack":
                return (
                    <SlackMessage
                        {...props}
                    />
                );
            case "messenger":
                return (
                    <MessengerMessage
                        {...props}
                    />
                );
            case "imessage":
                return (
                    <IMessage
                        {...props}
                    />
                );
            case "bumble":
                return (
                    <BumbleMessage
                        {...props}
                    />
                );
            case "grok":
                return (
                    <GrokMinimal
                        {...props}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="prose">
                <h1>Message Components Test Page</h1>
                <p>Test different message components and their variations.</p>
            </div>

            {/* Controls */}
            <div className="space-y-4 p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Controls</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={showReactionControls}
                                onCheckedChange={setShowReactionControls}
                                id="reaction-controls"
                            />
                            <Label htmlFor="reaction-controls">Reaction Controls</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={showMessageControls}
                                onCheckedChange={setShowMessageControls}
                                id="message-controls"
                            />
                            <Label htmlFor="message-controls">Message Controls</Label>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Style</label>
                        <Select value={style} onValueChange={(value: MessageStyle) => setStyle(value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="grok">Grok Minimal</SelectItem>
                                <SelectItem value="slack">Slack</SelectItem>
                                <SelectItem value="messenger">Messenger</SelectItem>
                                <SelectItem value="imessage">iMessage</SelectItem>
                                <SelectItem value="bumble">Bumble</SelectItem>
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

                {showReactionControls && (
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-sm font-medium">Reaction Controls</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {style === "slack" && (
                                <>
                                    <div className="space-y-2">
                                        <Label>Thread Count</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={threadCount}
                                            onChange={(e) => setThreadCount(parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Reactions</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full justify-start">
                                                    Add Reaction
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80">
                                                <div className="grid grid-cols-8 gap-2">
                                                    {["👍", "❤️", "😂", "🎉", "🚀", "👀", "💯", "✨"].map((emoji) => (
                                                        <Button
                                                            key={emoji}
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                            onClick={() => {
                                                                const newReaction = {
                                                                    emoji,
                                                                    count: 1,
                                                                    userReacted: true
                                                                };
                                                                setSlackReactions([...slackReactions, newReaction]);
                                                            }}
                                                        >
                                                            {emoji}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </>
                            )}

                            {style === "imessage" && (
                                <>
                                    <div className="space-y-2">
                                        <Label>Tapback</Label>
                                        <Select
                                            value={tapback}
                                            onValueChange={(value: any) => setTapback(value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="heart">❤️ Heart</SelectItem>
                                                <SelectItem value="thumbsUp">👍 Thumbs Up</SelectItem>
                                                <SelectItem value="thumbsDown">👎 Thumbs Down</SelectItem>
                                                <SelectItem value="ha-ha">😂 Ha Ha</SelectItem>
                                                <SelectItem value="exclamation">❗ Exclamation</SelectItem>
                                                <SelectItem value="question">❓ Question</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {showMessageControls && (
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-sm font-medium">Message Controls</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {style === "bumble" && (
                                <>
                                    <div className="space-y-2">
                                        <Label>Distance</Label>
                                        <Input
                                            value={distance}
                                            onChange={(e) => setDistance(e.target.value)}
                                            placeholder="e.g., 2 miles away"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Last Active</Label>
                                        <Input
                                            value={lastActive}
                                            onChange={(e) => setLastActive(e.target.value)}
                                            placeholder="e.g., Active now"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={isVerified}
                                                onCheckedChange={setIsVerified}
                                                id="verified"
                                            />
                                            <Label htmlFor="verified">Verified</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={isMatch}
                                                onCheckedChange={setIsMatch}
                                                id="match"
                                            />
                                            <Label htmlFor="match">Match</Label>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Preview</h2>
                <div className="border rounded-lg overflow-hidden shadow">
                    {renderMessage({
                        role,
                        content,
                        isLoading,
                        reactions: style === "slack" ? slackReactions : style === "imessage" ? iMessageReactions : [],
                        threadCount: style === "slack" ? 2 : 0,
                        isPinned: style === "slack" ? true : false,
                        isEdited: false,
                        onContentChange: setContent,
                        onDelete: () => setContent("")
                    })}
                </div>
            </div>

            {/* Examples */}
            <div className="space-y-4 border rounded-lg p-4 shadow">
                {Object.entries(LONG_CONVERSATION).map(([key, content], index) => {
                    const isUser = key.startsWith("user");
                    const props = {
                        role: isUser ? "user" : "assistant",
                        content,
                        isLoading: false,
                        // Add style-specific props here
                        ...(style === "slack" && {
                            reactions: index === 1 ? slackReactions : [],
                            threadCount: index === 1 ? 2 : 0,
                            isPinned: index === 2
                        }),
                        ...(style === "imessage" && {
                            reactions: index === 1 ? iMessageReactions : [],
                            tapback: index === 2 ? "heart" : undefined,
                            hasReadReceipt: isUser
                        }),
                        ...(style === "messenger" && {
                            reactions: index === 1 ? messengerReactions : [],
                            isRead: isUser,
                            isDelivered: isUser
                        }),
                        ...(style === "bumble" && {
                            isVerified: !isUser,
                            isMatch: index === 1,
                            distance: !isUser ? "2 miles away" : undefined,
                            lastActive: !isUser ? "Active now" : undefined
                        }),
                        ...(style === "grok" && {
                            responseTime: !isUser ? "2.1s" : undefined,
                            actions: !isUser ? {
                                onRegenerate: () => { },
                                onCopy: () => { },
                                onShare: () => { },
                                onLike: () => { },
                                onDislike: () => { }
                            } : undefined
                        })
                    };

                    return renderMessage(props);
                })}
            </div>
        </div>
    );
} 