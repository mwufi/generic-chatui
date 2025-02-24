'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Pen, Image, Video, Music, ArrowRight, FileText, Camera, Mic, Folder } from "lucide-react";
import { MenuWrapper } from './menu-wrapper';

interface NestedIconMenuProps {
    position?: 'fixed' | 'absolute';
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center-right' | 'center-left';
}

const menuItems = {
    main: [
        { id: 'create', icon: Pen, label: 'Create', description: 'Create new content' },
        { id: 'media', icon: Image, label: 'Media', description: 'Manage media files' },
        { id: 'document', icon: FileText, label: 'Document', description: 'Document options' },
    ],
    create: [
        { id: 'story', icon: Camera, label: 'Story', description: 'Share a quick update' },
        { id: 'post', icon: FileText, label: 'Post', description: 'Create a new post' },
        { id: 'reel', icon: Video, label: 'Reel', description: 'Make a short video' },
    ],
    media: [
        { id: 'photo', icon: Image, label: 'Photo', description: 'Upload photos' },
        { id: 'video', icon: Video, label: 'Video', description: 'Manage videos' },
        { id: 'audio', icon: Music, label: 'Audio', description: 'Audio files' },
    ],
    document: [
        { id: 'note', icon: FileText, label: 'Note', description: 'Quick notes' },
        { id: 'voice', icon: Mic, label: 'Voice Note', description: 'Record audio note' },
    ],
};

type MenuKey = keyof typeof menuItems;

const menuLabels: Record<MenuKey, string> = {
    main: 'Menu',
    create: 'Create',
    media: 'Media',
    document: 'Documents'
};

export function NestedIconMenu({ position, anchor }: NestedIconMenuProps) {
    const [currentMenu, setCurrentMenu] = useState<MenuKey>('main');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const handleMenuChange = (menuKey: MenuKey) => {
        setCurrentMenu(menuKey);
    };

    const itemVariants = {
        hidden: { opacity: 0 },
        visible: (i: number) => ({
            opacity: 1,
            transition: {
                delay: i * 0.03, // Faster stagger
                duration: 0.15, // Quicker fade
            }
        })
    };

    return (
        <MenuWrapper position={position} anchor={anchor}>
            <motion.div
                className="bg-background/80 backdrop-blur-sm border rounded-2xl shadow-lg overflow-hidden"
                initial={false}
                animate={{
                    width: currentMenu === 'main' ? 280 : 320
                }}
                transition={{ duration: 0.2 }} // Faster width transition
            >
                {/* Header with breadcrumb */}
                <div className="flex items-center gap-2 p-3 border-b bg-muted/50">
                    {currentMenu !== 'main' && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMenuChange('main')}
                            className="hover:bg-background/80 rounded-full h-8 w-8 shrink-0"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    )}
                    <div className="flex items-center gap-2 text-sm font-medium">
                        {currentMenu !== 'main' && (
                            <>
                                <span className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => handleMenuChange('main')}>
                                    {menuLabels.main}
                                </span>
                                <span className="opacity-50">/</span>
                            </>
                        )}
                        <span>{menuLabels[currentMenu]}</span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentMenu}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }} // Quick fade
                        className="p-2"
                    >
                        {menuItems[currentMenu].map((item, index) => (
                            <motion.div
                                key={item.id}
                                custom={index}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className={`
                                    relative flex items-center gap-3 p-2 rounded-xl cursor-pointer
                                    transition-colors duration-150
                                    ${hoveredItem === item.id ? 'bg-accent' : 'hover:bg-accent/50'}
                                `}
                                onHoverStart={() => setHoveredItem(item.id)}
                                onHoverEnd={() => setHoveredItem(null)}
                                onClick={() => {
                                    if (menuItems[item.id as MenuKey]) {
                                        handleMenuChange(item.id as MenuKey);
                                    } else {
                                        console.log('Clicked:', item.label);
                                    }
                                }}
                            >
                                <div className={`
                                    flex items-center justify-center h-10 w-10 rounded-full
                                    ${hoveredItem === item.id ? 'bg-background text-foreground' : 'bg-muted'}
                                    transition-colors duration-150
                                `}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium">{item.label}</div>
                                    <div className="text-xs text-muted-foreground truncate">
                                        {item.description}
                                    </div>
                                </div>
                                {menuItems[item.id as MenuKey] && (
                                    <ArrowRight className={`
                                        h-4 w-4 shrink-0
                                        ${hoveredItem === item.id ? 'opacity-100' : 'opacity-40'}
                                        transition-opacity duration-150
                                    `} />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </MenuWrapper>
    );
} 