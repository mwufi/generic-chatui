import { ChevronDown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type InputMode = "auto" | "code" | "image" | "voice";

interface ModeSelectorProps {
    mode: InputMode;
    onModeChange: (mode: InputMode) => void;
    disabled?: boolean;
}

export function ModeSelector({ mode, onModeChange, disabled }: ModeSelectorProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="lg"
                    disabled={disabled}
                    className="h-9 rounded-full px-3.5 py-2 transition-all duration-150 border border-toggle-border text-secondary hover:text-primary bg-transparent hover:bg-toggle-hover"
                >
                    <div>
                        <Rocket className="group-hover/output-mode:text-primary text-secondary size-6 sm:size-5" />
                    </div>
                    <span className="hidden @[600px]/input:inline-block text-primary">
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </span>
                    <ChevronDown className="size-5 sm:size-4 text-secondary" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onModeChange("auto")}>
                    Auto
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onModeChange("code")}>
                    Code
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onModeChange("image")}>
                    Image
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onModeChange("voice")}>
                    Voice
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 