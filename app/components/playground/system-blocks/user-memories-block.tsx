import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const MEMORY_CATEGORIES = [
    "Preferences",
    "Past Interactions",
    "Technical Background",
    "Project Goals"
];

interface UserMemoriesBlockProps {
    content: string;
    onChange: (content: string) => void;
    className?: string;
}

export function UserMemoriesBlock({ content, onChange, className }: UserMemoriesBlockProps) {
    return (
        <Card className={cn("group relative", className)}>
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium">User Memories</CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Store user preferences and interaction history</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Add information about the user's preferences and history..."
                    className="min-h-[100px] resize-none"
                />
                <div className="mt-4 space-y-2">
                    <div className="text-xs text-muted-foreground">
                        Memory Categories:
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {MEMORY_CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant="outline"
                                size="sm"
                                onClick={() => onChange(content + (content ? "\n\n" : "") + `${category}:\n- `)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 