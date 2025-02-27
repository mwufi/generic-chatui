import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CommentToggleProps {
    isOpen: boolean;
    onClick: () => void;
    commentCount?: number;
}

export function CommentToggle({ isOpen, onClick, commentCount = 0 }: CommentToggleProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className={cn(
                "relative h-8 w-8",
                isOpen && "bg-muted"
            )}
            title={isOpen ? "Hide comments" : "Show comments"}
        >
            <MessageSquare className="h-4 w-4" />
            {commentCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] font-medium flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                    {commentCount}
                </span>
            )}
        </Button>
    );
} 