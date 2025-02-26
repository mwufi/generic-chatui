import { AlignJustify, AlignCenter, PanelLeftClose } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WidthSelectorProps {
    currentWidth: 'normal' | 'wide' | 'full';
    onChange: (width: 'normal' | 'wide' | 'full') => void;
}

export function WidthSelector({ currentWidth, onChange }: WidthSelectorProps) {
    return (
        <div className="flex items-center gap-1">
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-8 w-8",
                    currentWidth === 'normal' && "bg-muted"
                )}
                onClick={() => onChange('normal')}
                title="Set --typingarea-max-width: 600px"
            >
                <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-8 w-8",
                    currentWidth === 'wide' && "bg-muted"
                )}
                onClick={() => onChange('wide')}
                title="Set --typingarea-max-width: 800px"
            >
                <PanelLeftClose className="h-4 w-4 rotate-180" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-8 w-8",
                    currentWidth === 'full' && "bg-muted"
                )}
                onClick={() => onChange('full')}
                title="Set --typingarea-max-width: 1200px"
            >
                <AlignJustify className="h-4 w-4" />
            </Button>
        </div>
    );
} 