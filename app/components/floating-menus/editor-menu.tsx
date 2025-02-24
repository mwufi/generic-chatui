'use client';

import { Button } from "@/components/ui/button";
import { Wand2, Sparkles, AlignJustify } from "lucide-react";

interface EditorMenuProps {
    content: string;
    onCleanupContent?: () => void;
}

export function EditorMenu({ content, onCleanupContent }: EditorMenuProps) {
    const handleCleanupContent = () => {
        console.log('Current content:', content);
        // TODO: Implement actual cleanup logic
        onCleanupContent?.();
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-background/80 backdrop-blur-sm border rounded-full shadow-lg">
            <Button
                variant="ghost"
                size="icon"
                onClick={handleCleanupContent}
                className="hover:bg-muted rounded-full h-10 w-10"
            >
                <Wand2 className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => console.log('Format content')}
                className="hover:bg-muted rounded-full h-10 w-10"
            >
                <AlignJustify className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => console.log('AI suggestions')}
                className="hover:bg-muted rounded-full h-10 w-10"
            >
                <Sparkles className="h-4 w-4" />
            </Button>
        </div>
    );
} 