import { ChatPlayground } from "@/app/components/playground/chat-playground";

export default function PlaygroundPage() {
    return (
        <div className="container mx-auto py-2 h-full grid grid-rows-[auto_1fr]">
            <h1 className="text-2xl font-bold m-6">Chat Playground</h1>
            <ChatPlayground />
        </div>
    );
} 