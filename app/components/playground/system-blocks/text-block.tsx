import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextBlockProps {
    content: string;
    onChange: (content: string) => void;
    className?: string;
}

export function TextBlock({ content, onChange, className }: TextBlockProps) {
    return (
        <Card className={cn("group relative", className)}>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Text Block</CardTitle>
                <CardDescription>Basic text input for system instructions</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="You are a helpful AI assistant..."
                    className="min-h-[100px] resize-none"
                />
                <div className="mt-2 text-xs text-muted-foreground">
                    Example: "You are an expert software engineer with deep knowledge of React and TypeScript..."
                </div>
            </CardContent>
        </Card>
    );
} 