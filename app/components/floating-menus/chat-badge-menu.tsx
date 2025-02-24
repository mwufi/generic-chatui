'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X } from "lucide-react";
import { MenuWrapper } from './menu-wrapper';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
}

interface ChatBadgeMenuProps {
    position?: 'fixed' | 'absolute';
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center-right' | 'center-left';
}

export function ChatBadgeMenu({ position, anchor }: ChatBadgeMenuProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello! How can I help you today?', isUser: false },
    ]);

    const handleSubmit = () => {
        if (message.trim()) {
            const newMessage = { id: Date.now().toString(), text: message, isUser: true };
            setMessages(prev => [...prev, newMessage]);
            setMessage('');

            // Mock response
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    text: 'Thanks for your message! I\'ll get back to you soon.',
                    isUser: false
                }]);
            }, 1000);
        }
    };

    return (
        <MenuWrapper position={position} anchor={anchor}>
            <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="w-80 bg-background border rounded-2xl shadow-lg overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <div className="flex items-center gap-2">
                                <MessageCircle className="h-5 w-5" />
                                <span className="font-medium">Chat</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsExpanded(false)}
                                className="hover:bg-muted rounded-full h-8 w-8"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4">
                            {messages.map(msg => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.isUser
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t">
                            <div className="flex items-center gap-2">
                                <Input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    placeholder="Type a message..."
                                    className="flex-1"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleSubmit}
                                    className="hover:bg-muted rounded-full h-8 w-8"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="badge"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="relative"
                        onClick={() => setIsExpanded(true)}
                    >
                        <Button
                            variant="default"
                            size="icon"
                            className="rounded-full h-12 w-12 shadow-lg"
                        >
                            <MessageCircle className="h-6 w-6" />
                        </Button>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            1
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </MenuWrapper>
    );
} 