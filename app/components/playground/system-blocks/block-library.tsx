import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Save, Plus } from "lucide-react";
import { SystemBlockType } from "../system-message-editor";

interface SavedBlock {
    id: string;
    name: string;
    type: SystemBlockType;
    content: string;
    createdAt: string;
}

interface BlockLibraryProps {
    onSelectBlock: (block: SavedBlock) => void;
    onClose: () => void;
}

// In a real app, this would be fetched from an API/database
const EXAMPLE_BLOCKS: SavedBlock[] = [
    {
        id: "1",
        name: "TypeScript Expert",
        type: "persona",
        content: "You are an expert TypeScript developer with deep knowledge of the type system...",
        createdAt: "2024-02-13"
    },
    {
        id: "2",
        name: "API Routes Search",
        type: "file_search",
        content: "Find all API route handlers in the codebase",
        createdAt: "2024-02-13"
    },
    {
        id: "3",
        name: "Code Review Persona",
        type: "persona",
        content: "You are a senior software engineer conducting a thorough code review...",
        createdAt: "2024-02-13"
    }
];

export function BlockLibrary({ onSelectBlock, onClose }: BlockLibraryProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [blocks, setBlocks] = useState<SavedBlock[]>(EXAMPLE_BLOCKS);

    const filteredBlocks = blocks.filter(block =>
        block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Block Library</CardTitle>
                <CardDescription>Save and reuse system message blocks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search blocks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Save className="h-4 w-4" />
                    </Button>
                </div>

                <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                        {filteredBlocks.map((block) => (
                            <Card
                                key={block.id}
                                className="cursor-pointer hover:bg-accent"
                                onClick={() => onSelectBlock(block)}
                            >
                                <CardHeader className="p-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-sm">{block.name}</CardTitle>
                                            <CardDescription className="text-xs">
                                                {block.type} • {block.createdAt}
                                            </CardDescription>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
} 