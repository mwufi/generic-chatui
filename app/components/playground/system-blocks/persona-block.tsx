import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const PERSONA_EXAMPLES = [
    "Expert TypeScript Developer",
    "UI/UX Design Specialist",
    "DevOps Engineer",
    "Security Expert"
];

interface PersonaBlockProps {
    content: string;
    onChange: (content: string) => void;
    className?: string;
}

export function PersonaBlock({ content, onChange, className }: PersonaBlockProps) {
    return (
        <Card className={cn("group relative", className)}>
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium">Persona</CardTitle>
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Define the AI's expertise and personality</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Define the AI's expertise and traits..."
                    className="min-h-[100px] resize-none"
                />
                <div className="mt-4 space-y-2">
                    <div className="text-xs text-muted-foreground">
                        Quick Templates:
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {PERSONA_EXAMPLES.map((example) => (
                            <Button
                                key={example}
                                variant="outline"
                                size="sm"
                                onClick={() => onChange(
                                    `You are an ${example} with extensive experience in the field. ` +
                                    `Provide detailed, accurate, and practical advice. ` +
                                    `Focus on best practices and modern approaches.`
                                )}
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