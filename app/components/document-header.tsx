'use client';

import { useState } from 'react';
import { History, ArrowLeft, ArrowRight, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DocumentHeaderProps {
    title: string;
    onTitleChange: (title: string) => void;
}

export function DocumentHeader({ title, onTitleChange }: DocumentHeaderProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableTitle, setEditableTitle] = useState(title);

    const handleTitleSubmit = () => {
        onTitleChange(editableTitle);
        setIsEditing(false);
    };

    return (
        <div className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 bg-gradient-to-b from-background to-transparent z-10">
            <div className="flex items-center gap-2">
            </div>

            {isEditing ? (
                <Input
                    value={editableTitle}
                    onChange={(e) => setEditableTitle(e.target.value)}
                    onBlur={handleTitleSubmit}
                    onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
                    className="h-8 max-w-[240px] bg-transparent"
                    autoFocus
                />
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    className="text-lg font-semibold hover:underline"
                >
                    {title}
                </button>
            )}

            <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <History className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                </Button>
                <img
                    src="/example.png"
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                />
            </div>
        </div>
    );
} 