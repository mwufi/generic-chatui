import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, Library, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TextBlock } from "./system-blocks/text-block";
import { FileSearchBlock } from "./system-blocks/file-search-block";
import { PersonaBlock } from "./system-blocks/persona-block";
import { CodebaseContextBlock } from "./system-blocks/codebase-context-block";
import { UserMemoriesBlock } from "./system-blocks/user-memories-block";
import { BlockLibrary } from "./system-blocks/block-library";

export type SystemBlockType =
    | "text"
    | "file_search"
    | "codebase_context"
    | "persona"
    | "user_memories";

interface SystemBlock {
    id: string;
    type: SystemBlockType;
    content: string;
}

interface SystemMessageEditorProps {
    blocks: SystemBlock[];
    onBlocksChange: (blocks: SystemBlock[]) => void;
    isVisible: boolean;
    onVisibilityToggle: () => void;
    className?: string;
}

export function SystemMessageEditor({
    blocks,
    onBlocksChange,
    isVisible,
    onVisibilityToggle,
    className
}: SystemMessageEditorProps) {
    const addBlock = (type: SystemBlockType) => {
        const newBlock: SystemBlock = {
            id: Math.random().toString(36).substring(7),
            type,
            content: ""
        };
        onBlocksChange([...blocks, newBlock]);
    };

    const updateBlock = (id: string, content: string) => {
        const newBlocks = blocks.map(block =>
            block.id === id ? { ...block, content } : block
        );
        onBlocksChange(newBlocks);
    };

    const removeBlock = (id: string) => {
        const newBlocks = blocks.filter(block => block.id !== id);
        onBlocksChange(newBlocks);
    };

    const renderBlock = (block: SystemBlock) => {
        const props = {
            content: block.content,
            onChange: (content: string) => updateBlock(block.id, content),
            className: "relative group"
        };

        const deleteButton = blocks.length > 1 && (
            <Button
                variant="ghost"
                size="icon"
                className="absolute -right-2 -top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-background border shadow-sm"
                onClick={() => removeBlock(block.id)}
            >
                <X className="h-3 w-3" />
            </Button>
        );

        const blockWithDelete = (component: React.ReactNode) => (
            <div className="relative group">
                {component}
                {deleteButton}
            </div>
        );

        switch (block.type) {
            case "text":
                return blockWithDelete(<TextBlock {...props} />);
            case "file_search":
                return blockWithDelete(<FileSearchBlock {...props} onSearch={() => { }} />);
            case "persona":
                return blockWithDelete(<PersonaBlock {...props} />);
            case "codebase_context":
                return blockWithDelete(<CodebaseContextBlock {...props} />);
            case "user_memories":
                return blockWithDelete(<UserMemoriesBlock {...props} />);
            default:
                return null;
        }
    };

    return (
        <div className={cn(
            "rounded-lg transition-all duration-200",
            isVisible ? "bg-secondary/40 shadow-sm" : "bg-transparent",
            className
        )}>
            <button
                className="w-full px-4 py-2 flex items-center gap-2 text-sm"
                onClick={onVisibilityToggle}
            >
                <span className={cn(
                    "transition-transform duration-200",
                    isVisible ? "rotate-0" : "-rotate-90"
                )}>
                    <ChevronDown className="h-4 w-4" />
                </span>
                System message
            </button>

            {isVisible && (
                <div className="px-4 pb-3 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    {blocks.map((block, index) => (
                        <div key={block.id} className="relative">
                            {renderBlock(block)}
                        </div>
                    ))}

                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Block
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => addBlock("text")}>
                                    Text
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => addBlock("file_search")}>
                                    File Search Results
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => addBlock("codebase_context")}>
                                    Codebase Context
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => addBlock("persona")}>
                                    Persona
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => addBlock("user_memories")}>
                                    User Memories
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="w-[120px]">
                                    <Library className="h-4 w-4 mr-2" />
                                    Library
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="p-0">
                                <BlockLibrary
                                    onSelectBlock={(block) => {
                                        const newBlock: SystemBlock = {
                                            id: Math.random().toString(36).substring(7),
                                            type: block.type,
                                            content: block.content
                                        };
                                        onBlocksChange([...blocks, newBlock]);
                                    }}
                                    onClose={() => { }}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            )}
        </div>
    );
} 