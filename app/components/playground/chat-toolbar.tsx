import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code, Download, Eraser, Save, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatToolbarProps {
    convoName: string;
    onConvoNameChange: (name: string) => void;
    isJsonView: boolean;
    onJsonViewToggle: () => void;
    isSidebarOpen: boolean;
    onSidebarToggle: () => void;
    onSave?: () => void;
    onClear?: () => void;
    onExport?: () => void;
    className?: string;
}

export function ChatToolbar({
    convoName,
    onConvoNameChange,
    isJsonView,
    onJsonViewToggle,
    isSidebarOpen,
    onSidebarToggle,
    onSave,
    onClear,
    onExport,
    className
}: ChatToolbarProps) {
    return (
        <div className={cn(
            "chat-toolbar h-14 px-4 flex items-center justify-between gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            className
        )}>
            <div className="flex items-center gap-2">
                <Input
                    value={convoName}
                    onChange={(e) => onConvoNameChange(e.target.value)}
                    className="chat-toolbar-input bg-[var(--msg-secondary)] max-w-[300px] h-8 bg-transparent"
                    placeholder="Untitled conversation"
                />
            </div>
            <div className="flex items-center gap-2">
                {onClear && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="chat-toolbar-button h-8 w-8"
                        onClick={onClear}
                    >
                        <Eraser className="h-4 w-4" />
                    </Button>
                )}
                {onExport && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="chat-toolbar-button h-8 w-8"
                        onClick={onExport}
                    >
                        <Download className="h-4 w-4" />
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onJsonViewToggle}
                    className={cn("chat-toolbar-button h-8 w-8", isJsonView && "text-primary")}
                >
                    <Code className="h-4 w-4" />
                </Button>
                {onSave && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onSave}
                        className="chat-toolbar-button h-8 w-8"
                    >
                        <Save className="h-4 w-4" />
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onSidebarToggle}
                    className={cn("chat-toolbar-button h-8 w-8", isSidebarOpen && "text-primary")}
                >
                    <Settings className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
} 