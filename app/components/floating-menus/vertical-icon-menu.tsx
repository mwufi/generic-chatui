'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Settings, User, Bell, Search } from "lucide-react";
import { MenuWrapper } from './menu-wrapper';

interface VerticalIconMenuProps {
    position?: 'fixed' | 'absolute';
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center-right' | 'center-left';
}

const menuItems = [
    { icon: Search, label: 'Search' },
    { icon: Bell, label: 'Notifications' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
];

export function VerticalIconMenu({ position, anchor }: VerticalIconMenuProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <MenuWrapper position={position} anchor={anchor}>
            <motion.div
                className="flex flex-col gap-2"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {menuItems.map((item, index) => (
                    <div
                        key={item.label}
                        className="relative flex items-center"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative z-10 hover:bg-muted rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm border shadow-lg"
                        >
                            <item.icon className="h-4 w-4" />
                        </Button>

                        {hoveredIndex === index && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: -5 }}
                                className="absolute right-12 bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
                            >
                                {item.label}
                            </motion.div>
                        )}
                    </div>
                ))}
            </motion.div>
        </MenuWrapper>
    );
} 