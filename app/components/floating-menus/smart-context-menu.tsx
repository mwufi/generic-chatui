'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
    Bold, Italic, Underline, Quote, Search, Book,
    Wand2, MessageSquare, Sparkles, ArrowRight,
    ExternalLink, BookOpen, Languages
} from "lucide-react";
import { MenuWrapper } from './menu-wrapper';

interface SmartContextMenuProps {
    position?: 'fixed' | 'absolute';
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center-right' | 'center-left';
    selectedText?: string;
    onAction?: (action: string, text: string) => void;
}

// Different menu configurations based on text type
const MENU_CONFIGS = {
    default: [
        { id: 'bold', icon: Bold, label: 'Bold' },
        { id: 'italic', icon: Italic, label: 'Italic' },
        { id: 'underline', icon: Underline, label: 'Underline' },
        { id: 'improve', icon: Wand2, label: 'Improve writing' },
    ],
    quote: [
        { id: 'cite', icon: Quote, label: 'Add citation' },
        { id: 'search', icon: Search, label: 'Search source' },
        { id: 'reference', icon: Book, label: 'Add to references' },
    ],
    long: [
        { id: 'summarize', icon: MessageSquare, label: 'Summarize' },
        { id: 'improve', icon: Wand2, label: 'Improve' },
        { id: 'simplify', icon: Sparkles, label: 'Simplify' },
    ],
    link: [
        { id: 'open', icon: ExternalLink, label: 'Open link' },
        { id: 'cite', icon: Quote, label: 'Cite source' },
        { id: 'preview', icon: BookOpen, label: 'Preview' },
    ],
    word: [
        { id: 'define', icon: Book, label: 'Define' },
        { id: 'translate', icon: Languages, label: 'Translate' },
        { id: 'synonyms', icon: Sparkles, label: 'Synonyms' },
    ],
};

function getMenuType(text: string): keyof typeof MENU_CONFIGS {
    if (!text) return 'default';
    if (text.startsWith('http') || text.startsWith('www')) return 'link';
    if (text.includes('"') || text.includes('"')) return 'quote';
    if (text.split(' ').length > 20) return 'long';
    if (text.split(' ').length === 1) return 'word';
    return 'default';
}

export function SmartContextMenu({ position, anchor, selectedText = '', onAction }: SmartContextMenuProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const menuType = getMenuType(selectedText);
    const menuItems = MENU_CONFIGS[menuType];

    return (
        <MenuWrapper position={position} anchor={anchor}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg overflow-hidden min-w-[180px]"
            >
                <div className="p-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={menuType}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Button
                                        variant="ghost"
                                        className={`
                                            w-full justify-start gap-2 rounded-md px-2 py-1.5 text-sm
                                            ${hoveredItem === item.id ? 'bg-accent' : 'hover:bg-accent/50'}
                                            transition-colors duration-150
                                        `}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        onClick={() => onAction?.(item.id, selectedText)}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span className="flex-1">{item.label}</span>
                                        {hoveredItem === item.id && (
                                            <ArrowRight className="h-3 w-3 opacity-50" />
                                        )}
                                    </Button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </MenuWrapper>
    );
} 