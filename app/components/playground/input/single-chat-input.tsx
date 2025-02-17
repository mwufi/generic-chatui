import { useState, useRef, useEffect } from "react";
import { SendButton } from "./send-button";
import { Smile, Plus, Mic, Image, Paperclip, BarChart } from "lucide-react";
import { FileAttachment } from "./file-attachment";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface SingleChatInputProps {
    onChange?: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    theme?: string;
}

export function SingleChatInput({
    onChange,
    onSubmit,
    value = "",
    disabled,
    placeholder = "Message...",
    theme = "default"
}: SingleChatInputProps) {
    const [content, setContent] = useState(value);
    const [files, setFiles] = useState<File[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "20px";
            textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
        }
    }, [content]);

    // Sync with external value if provided
    useEffect(() => {
        if (value !== content) {
            setContent(value);
        }
    }, [value]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim() || files.length > 0) {
            onSubmit(e);
            setFiles([]);
            if (textareaRef.current) {
                textareaRef.current.style.height = "20px";
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setContent(newValue);
        onChange?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles([...files, ...Array.from(e.target.files)]);
            e.target.value = '';
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className={`absolute bottom-0 inset-x-4 mx-auto max-w-[calc(50rem-2rem)] z-50 theme-${theme}`}>
            <div className="relative z-40 flex flex-col items-center w-full">
                <div className="relative w-full px-2 pb-3">
                    <form onSubmit={handleSubmit} className="relative z-10">
                        {/* File Attachments */}
                        {files.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                                {files.map((file, index) => (
                                    <FileAttachment
                                        key={index}
                                        filename={file.name}
                                        onRemove={() => removeFile(index)}
                                        theme={theme}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-2 bg-[var(--msg-secondary)] p-2 rounded-full">
                            {/* Add button with popover */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        type="button"
                                        className="flex-none p-2 rounded-full hover:bg-[var(--msg-hover)] text-[var(--msg-content)]"
                                        disabled={disabled}
                                    >
                                        <Plus className="size-5" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent side="top" align="start" className="w-[280px] p-2">
                                    <div className="grid gap-1">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-[var(--msg-hover)] text-[var(--msg-content)]"
                                        >
                                            <Paperclip className="size-5" />
                                            <span>Attach a file up to 25 MB</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-[var(--msg-hover)] text-[var(--msg-content)]"
                                        >
                                            <Image className="size-5" />
                                            <span>Choose a photo</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-[var(--msg-hover)] text-[var(--msg-content)]"
                                        >
                                            <Mic className="size-5" />
                                            <span>Send a voice clip</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-[var(--msg-hover)] text-[var(--msg-content)]"
                                        >
                                            <BarChart className="size-5" />
                                            <span>Create a poll</span>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFileSelect}
                                disabled={disabled}
                            />

                            {/* Input wrapper */}
                            <div className="flex-1 min-w-0 pt-1">
                                <textarea
                                    ref={textareaRef}
                                    value={content}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder={placeholder}
                                    className="w-full bg-transparent text-[var(--msg-content)] placeholder:text-[var(--msg-content-secondary)] resize-none focus:outline-none py-1 px-2 min-h-[20px]"
                                    style={{
                                        height: "20px",
                                        maxHeight: "100px",
                                    }}
                                    disabled={disabled}
                                />
                            </div>

                            {/* Right side buttons */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="flex-none p-2 rounded-full hover:bg-[var(--msg-hover)] text-[var(--msg-content)]"
                                    disabled={disabled}
                                >
                                    <Smile className="size-5" />
                                </button>
                                {(content.trim() || files.length > 0) && (
                                    <SendButton
                                        onClick={() => handleSubmit(new Event('submit') as any)}
                                        disabled={disabled || (!content.trim() && files.length === 0)}
                                    />
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 