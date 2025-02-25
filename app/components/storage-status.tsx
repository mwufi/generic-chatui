import { StorageStatus } from "@/app/hooks/use-document-storage";
import { cn } from "@/lib/utils";

interface StorageStatusProps {
    status: StorageStatus;
    error?: Error | null;
}

export function StorageStatus({ status, error }: StorageStatusProps) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <div
                className={cn(
                    "w-2 h-2 rounded-full",
                    status === 'saved' && "bg-green-500",
                    status === 'saving' && "bg-yellow-500 animate-pulse",
                    status === 'error' && "bg-red-500",
                    status === 'idle' && "bg-gray-400"
                )}
            />
            <span className={cn(
                "text-muted-foreground",
                status === 'error' && "text-red-500"
            )}>
                {status === 'saved' && 'All changes saved'}
                {status === 'saving' && 'Saving...'}
                {status === 'error' && (error?.message || 'Error saving')}
                {status === 'idle' && 'Ready'}
            </span>
        </div>
    );
} 