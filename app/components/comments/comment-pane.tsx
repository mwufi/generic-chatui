import { cn } from "@/lib/utils";

interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: string;
}

interface CommentPaneProps {
    isOpen: boolean;
    comments: Comment[];
}

export function CommentPane({ isOpen, comments }: CommentPaneProps) {
    return (
        <div className="h-full">
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Comments</h2>
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="group relative p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-card-foreground">{comment.content}</p>
                            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* Add comment actions here later */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 