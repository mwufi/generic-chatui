import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLES = [
    "Project architecture and structure",
    "Key dependencies and versions",
    "Important design patterns used",
    "Database schema overview"
];

interface CodebaseContextBlockProps {
    content: string;
    onChange: (content: string) => void;
    className?: string;
}

export function CodebaseContextBlock({ content, onChange, className }: CodebaseContextBlockProps) {
    return (
        <Card className={cn("group relative", className)}>
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium">Codebase Context</CardTitle>
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Add relevant codebase information and context</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Describe important aspects of the codebase..."
                    className="min-h-[100px] resize-none"
                />
                <div className="mt-4 space-y-2">
                    <div className="text-xs text-muted-foreground">
                        Suggested topics:
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {EXAMPLES.map((example) => (
                            <Button
                                key={example}
                                variant="outline"
                                size="sm"
                                onClick={() => onChange(content + (content ? "\n\n" : "") + example + ":")}
                            >
                                {example}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 