export interface Message {
    id: string;
    role: "system" | "user" | "assistant";
    content: string;
    isLoading?: boolean;
    timestamp?: Date;
    avatar?: string;
    username?: string;
    reactions?: Array<{
        emoji: string;
        count: number;
        userReacted?: boolean;
        effect?: "gentle" | "loud" | "slam" | "ha-ha";
    }>;
    onContentChange?: (content: string) => void;
    onDelete?: () => void;
}

export interface MessageAction {
    label: string;
    icon?: React.ComponentType;
    onClick: () => void;
}

// Platform-specific props
export interface SlackMessageProps extends Message {
    threadCount?: number;
    isPinned?: boolean;
    isEdited?: boolean;
}

export interface MessengerMessageProps extends Message {
    isRead?: boolean;
    isSent?: boolean;
    isDelivered?: boolean;
}

export interface DiscordMessageProps extends Message {
    isReplying?: boolean;
    replyTo?: {
        username: string;
        content: string;
    };
    attachments?: Array<{
        type: "image" | "video" | "file";
        url: string;
        name?: string;
    }>;
    roles?: string[];
}

export interface BumbleMessageProps extends Message {
    showHeader?: boolean;
    isMatch?: boolean;
    isVerified?: boolean;
    distance?: string;
    lastActive?: string;
    isTyping?: boolean;
}

export interface IMessageProps extends Message {
    tapback?: "heart" | "thumbsUp" | "thumbsDown" | "ha-ha" | "exclamation" | "question";
    subject?: string;
    isDelivered?: boolean;
    hasReadReceipt?: boolean;
}

export interface GrokMinimalMessageProps extends Message {
    responseTime?: string;
    actions?: {
        onRegenerate?: () => void;
        onCopy?: () => void;
        onShare?: () => void;
        onLike?: () => void;
        onDislike?: () => void;
    };
} 