'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { MenuWrapper } from './menu-wrapper';

interface ExpandingIconMenuProps {
    position?: 'fixed' | 'absolute';
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center-right' | 'center-left';
}

export function ExpandingIconMenu({ position, anchor }: ExpandingIconMenuProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (message.trim()) {
            console.log('Sending message:', message);
            setMessage('');
            setIsExpanded(false);
        }
    };

    return (
        <MenuWrapper position={position} anchor={anchor}>
            <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.div
                        key="expanded"
                        initial={{ width: 40, opacity: 0 }}
                        animate={{ width: 300, opacity: 1 }}
                        exit={{ width: 40, opacity: 0 }}
                        className="flex items-center gap-2 p-1.5 bg-background/80 backdrop-blur-sm border rounded-full shadow-lg"
                    >
                        <Input
                            autoFocus
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            className="flex-1 border-0 focus-visible:ring-0 bg-transparent"
                            placeholder="Type your message..."
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSubmit}
                            className="hover:bg-muted rounded-full h-8 w-8"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="collapsed"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center p-1.5 bg-background/80 backdrop-blur-sm border rounded-full shadow-lg"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsExpanded(true)}
                            className="hover:bg-muted rounded-full h-10 w-10"
                        >
                            <MessageCircle className="h-4 w-4" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </MenuWrapper>
    );
} 