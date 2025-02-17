import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileSearchBlockProps {
    content: string;
    onChange: (content: string) => void;
    onSearch?: () => void;
    className?: string;
}

export function FileSearchBlock({ content, onChange, onSearch, className }: FileSearchBlockProps) {
    return (
        <Card className={cn("group relative", className)}>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">File Search</CardTitle>
                <CardDescription>Search for relevant files and include them as context</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Textarea
                        value={content}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Enter search terms..."
                        className="min-h-[60px] resize-none"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onSearch}
                        className="h-10 w-10 shrink-0"
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
                <div className="mt-2 space-y-1">
                    <div className="text-xs text-muted-foreground">
                        Examples:
                    </div>
                    <div className="text-xs text-muted-foreground pl-2">
                        • "Find all API route handlers"<br />
                        • "Search for authentication related code"<br />
                        • "Look for database schema definitions"
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 