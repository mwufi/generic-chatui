import { ArrowUp } from "lucide-react";

interface SendButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

export function SendButton({ onClick, disabled }: SendButtonProps) {
    return (
        <button
            className="group flex flex-col justify-center rounded-full focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-transform hover:scale-110 duration-200"
            type="submit"
            onClick={onClick}
            disabled={disabled}
            tabIndex={0}
        >
            <div className="h-9 relative aspect-square flex flex-col items-center justify-center rounded-full ring-1 ring-inset before:absolute before:inset-0 before:rounded-full before:bg-primary before:ring-0 before:transition-all duration-500 bg-primary text-background ring-transparent before: before:[clip-path:circle(50%_at_50%_50%)]">
                <ArrowUp className="relative size-[22px] stroke-[2.5px]" />
            </div>
        </button>
    );
} 