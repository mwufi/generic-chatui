import { useState, useRef, useEffect } from "react";
import { FileAttachment } from "./file-attachment";
import { FileAttachmentButton } from "./file-attachment-button";
import { ModeSelector, InputMode } from "./mode-selector";
import { SendButton } from "./send-button";

interface ChatInputProps {
    onSend: (message: { content: string; files?: File[] }) => void;
    disabled?: boolean;
    placeholder?: string;
    theme?: string;
}

export function ChatInput({
    onSend,
    disabled,
    placeholder = "How can I help?",
    theme = "default"
}: ChatInputProps) {
    const [content, setContent] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [mode, setMode] = useState<InputMode>("auto");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "44px";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [content]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (content.trim() || files.length > 0) {
            onSend({ content: content.trim(), files });
            setContent("");
            setFiles([]);
            if (textareaRef.current) {
                textareaRef.current.style.height = "44px";
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleFileSelect = (fileList: FileList) => {
        setFiles([...files, ...Array.from(fileList)]);
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className={`absolute bottom-0 mx-auto inset-x-0 max-w-[50rem] z-50 theme-${theme}`}>
            <div className="relative z-40 flex flex-col items-center w-full">
                <div className="relative w-full px-2 pb-3 sm:pb-4">
                    <form onSubmit={handleSubmit} className="bottom-0 w-full text-base flex flex-col gap-2 items-center justify-center relative z-10">
                        <div className="flex flex-row gap-2 justify-center w-full relative">
                            <div className="chat-toolbar duration-150 relative w-full max-w-[50rem] overflow-hidden pb-12 px-3 rounded-3xl shadow">
                                {/* File Attachments */}
                                {files.length > 0 && (
                                    <div className="w-full flex flex-row gap-2 mt-3 flex-wrap whitespace-nowrap">
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

                                {/* Input Area */}
                                <div className="relative z-10">
                                    <span className="tracking-[-0.02em] absolute px-3 py-5 text-secondary pointer-events-none">
                                        {!content && placeholder}
                                    </span>
                                    <textarea
                                        ref={textareaRef}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="chat-toolbar-input w-full px-3 pt-5 mb-5 focus:outline-none text-primary align-bottom resize-none"
                                        style={{ height: "44px" }}
                                        disabled={disabled}
                                    />
                                </div>

                                {/* Bottom Toolbar */}
                                <div className="flex gap-1.5 absolute inset-x-0 bottom-0 border-2 border-transparent p-3">
                                    <FileAttachmentButton
                                        onFileSelect={handleFileSelect}
                                        disabled={disabled}
                                        theme={theme}
                                    />
                                    <div className="flex gap-1.5 grow">
                                        <div className="grow flex gap-1.5">
                                            <ModeSelector
                                                mode={mode}
                                                onModeChange={setMode}
                                                disabled={disabled}
                                                theme={theme}
                                            />
                                            <div className="flex items-center ml-auto" />
                                        </div>
                                    </div>
                                    <div className="ml-auto flex flex-row items-end gap-1">
                                        <SendButton
                                            onClick={handleSubmit}
                                            disabled={disabled || (!content.trim() && files.length === 0)}
                                            theme={theme}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="absolute bottom-0 w-[calc(100%-1rem)] h-full rounded-t-[40px] bg-msg-bg" />
                </div>
            </div>
        </div>
    );
} 