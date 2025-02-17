import { X, File } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileAttachmentProps {
    filename: string;
    onRemove: () => void;
    theme?: string;
}

export function FileAttachment({ filename, onRemove, theme = "default" }: FileAttachmentProps) {
    // Truncate filename if too long
    const displayName = filename.length > 15
        ? filename.slice(0, 10) + "..." + filename.slice(-5)
        : filename;

    return (
        <div className={`theme-${theme} flex flex-row items-center rounded-xl px-3 h-10 bg-msg-secondary text-sm transition ease-in-out pr-1.5 cursor-pointer hover:bg-msg-secondary/80 text-msg-content`}>
            <File className="!size-4 mr-2" />
            {displayName}
            <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="chat-toolbar-button inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:-mx-0.5 h-6 w-6 rounded-full ml-1 p-0.5"
            >
                <X className="size-4" />
            </Button>
        </div>
    );
} 