'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AgentToolbarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    selectedTags: string[];
    onTagsChange: (tags: string[]) => void;
    showArchived: boolean;
    onShowArchivedChange: (show: boolean) => void;
    availableTags: string[];
}

export function AgentToolbar({
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
    selectedTags,
    onTagsChange,
    showArchived,
    onShowArchivedChange,
    availableTags,
}: AgentToolbarProps) {
    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onTagsChange(selectedTags.filter(t => t !== tag));
        } else {
            onTagsChange([...selectedTags, tag]);
        }
    };

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search agents..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Select value={sortBy} onValueChange={onSortChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="updated">Recently Updated</SelectItem>
                        <SelectItem value="created">Recently Created</SelectItem>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                            {(selectedTags.length > 0 || showArchived) && (
                                <Badge variant="secondary" className="ml-1">
                                    {selectedTags.length + (showArchived ? 1 : 0)}
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Filters</h4>
                                <p className="text-sm text-muted-foreground">
                                    Filter agents by tags and status
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label>Tags</Label>
                                <div className="flex flex-wrap gap-1">
                                    {availableTags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => toggleTag(tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <Separator />
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Button
                                    variant={showArchived ? "default" : "outline"}
                                    onClick={() => onShowArchivedChange(!showArchived)}
                                    className="justify-start"
                                >
                                    Show Archived
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
} 