export type MessageRole = "system" | "user" | "assistant";

export interface BaseMessageProps {
    role: MessageRole;
    content: string;
    isLoading?: boolean;
    timestamp?: Date;
    avatar?: string;
    username?: string;
    onContentChange?: (content: string) => void;
    onDelete?: () => void;
    metadata?: Record<string, any>;
}

export interface MessageAction {
    label: string;
    icon?: React.ComponentType;
    onClick: () => void;
}

// Platform-specific props
export interface SlackMessageProps extends BaseMessageProps {
    reactions?: Array<{
        emoji: string;
        count: number;
        userReacted?: boolean;
    }>;
    threadCount?: number;
    isPinned?: boolean;
    isEdited?: boolean;
}

export interface MessengerMessageProps extends BaseMessageProps {
    isRead?: boolean;
    isSent?: boolean;
    isDelivered?: boolean;
    reactions?: Array<{
        emoji: string;
        userId: string;
    }>;
}

export interface DiscordMessageProps extends BaseMessageProps {
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

export interface BumbleMessageProps extends BaseMessageProps {
    showHeader?: boolean;
    isMatch?: boolean;
    isVerified?: boolean;
    distance?: string;
    lastActive?: string;
    isTyping?: boolean;
}

export interface IMessageProps extends BaseMessageProps {
    isDelivered?: boolean;
    reactions?: Array<{
        emoji: string;
        effect?: "gentle" | "loud" | "slam" | "ha-ha";
    }>;
    tapback?: "heart" | "thumbsUp" | "thumbsDown" | "ha-ha" | "exclamation" | "question";
    subject?: string;
    hasReadReceipt?: boolean;
}

export interface GrokMinimalMessageProps extends BaseMessageProps {
    responseTime?: string;
    actions?: {
        onRegenerate?: () => void;
        onCopy?: () => void;
        onShare?: () => void;
        onLike?: () => void;
        onDislike?: () => void;
    };
} 