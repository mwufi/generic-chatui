import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface FileAttachmentButtonProps {
    onFileSelect: (files: FileList) => void;
    disabled?: boolean;
}

export function FileAttachmentButton({ onFileSelect, disabled }: FileAttachmentButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files);
            // Reset input value so the same file can be selected again
            e.target.value = '';
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={disabled}
                onClick={handleClick}
                className="h-9 rounded-full py-2 relative px-2 transition-all duration-150 border w-9 aspect-square border-toggle-border text-secondary hover:text-primary bg-transparent hover:bg-toggle-hover"
            >
                <Paperclip className="size-5" />
            </Button>
        </>
    );
} 