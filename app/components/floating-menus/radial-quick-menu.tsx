'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Bold, Italic, Heading1, Quote, ListOrdered, Image, Wand2, Sparkles } from "lucide-react";
import { MenuWrapper } from './menu-wrapper';

interface RadialQuickMenuProps {
    position?: 'fixed' | 'absolute';
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center-right' | 'center-left';
    onAction?: (action: string) => void;
}

const MENU_ITEMS = [
    { id: 'bold', icon: Bold, label: 'Bold', shortcut: '⌘B' },
    { id: 'heading', icon: Heading1, label: 'Heading', shortcut: '⌘⇧1' },
    { id: 'quote', icon: Quote, label: 'Quote', shortcut: '⌘⇧.' },
    { id: 'list', icon: ListOrdered, label: 'List', shortcut: '⌘⇧7' },
    { id: 'image', icon: Image, label: 'Image', shortcut: '⌘⇧I' },
    { id: 'improve', icon: Wand2, label: 'Improve', shortcut: '⌘I' },
    { id: 'ai', icon: Sparkles, label: 'AI', shortcut: '⌘⇧A' },
];

export function RadialQuickMenu({ position, anchor, onAction }: RadialQuickMenuProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(true);

    // Calculate positions in a circle
    const itemCount = MENU_ITEMS.length;
    const radius = 80; // Distance from center
    const angleStep = (2 * Math.PI) / itemCount;
    const startAngle = -Math.PI / 2; // Start from top

    return (
        <MenuWrapper position={position} anchor={anchor}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-[200px] h-[200px]"
            >
                {/* Center button */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                    whileHover={{ scale: 1.1 }}
                >
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-2"
                        onClick={() => setIsOpen(false)}
                    >
                        <Bold className="h-5 w-5" />
                    </Button>
                </motion.div>

                {/* Radial menu items */}
                <AnimatePresence>
                    {isOpen && MENU_ITEMS.map((item, index) => {
                        const angle = startAngle + index * angleStep;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    x: x + 100, // Center in the 200x200 container
                                    y: y + 100,
                                }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className="absolute"
                                style={{
                                    originX: 0.5,
                                    originY: 0.5,
                                }}
                            >
                                <div className="relative">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className={`
                                            h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm
                                            ${hoveredItem === item.id ? 'bg-accent border-accent' : ''}
                                            transition-colors duration-150
                                        `}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        onClick={() => {
                                            onAction?.(item.id);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <item.icon className="h-4 w-4" />
                                    </Button>

                                    {/* Tooltip */}
                                    {hoveredItem === item.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md border shadow-sm whitespace-nowrap"
                                        >
                                            <div className="text-xs font-medium">{item.label}</div>
                                            <div className="text-[10px] text-muted-foreground">{item.shortcut}</div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </MenuWrapper>
    );
} 