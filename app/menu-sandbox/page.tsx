'use client';

import { ExpandingIconMenu } from "@/app/components/floating-menus/expanding-icon-menu";
import { VerticalIconMenu } from "@/app/components/floating-menus/vertical-icon-menu";
import { NestedIconMenu } from "@/app/components/floating-menus/nested-icon-menu";
import { ChatBadgeMenu } from "@/app/components/floating-menus/chat-badge-menu";

export default function MenuSandbox() {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-3xl font-bold mb-8">Menu Sandbox</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Example sections */}
                <div className="relative h-[400px] bg-white rounded-xl shadow-sm border p-4">
                    <h2 className="text-xl font-semibold mb-4">Expanding Icon Menu</h2>
                    <p className="text-sm text-muted-foreground mb-8">
                        Single icon that expands into a textbox with send button
                    </p>
                    <ExpandingIconMenu position="absolute" anchor="bottom-center" />
                </div>

                <div className="relative h-[400px] bg-white rounded-xl shadow-sm border p-4">
                    <h2 className="text-xl font-semibold mb-4">Vertical Icon Menu</h2>
                    <p className="text-sm text-muted-foreground mb-8">
                        Vertical stack of icons with expanding labels
                    </p>
                    <VerticalIconMenu position="absolute" anchor="center-right" />
                </div>

                <div className="relative h-[400px] bg-white rounded-xl shadow-sm border p-4">
                    <h2 className="text-xl font-semibold mb-4">Nested Icon Menu</h2>
                    <p className="text-sm text-muted-foreground mb-8">
                        Menu with submenu navigation
                    </p>
                    <NestedIconMenu position="absolute" anchor="center-right" />
                </div>

                <div className="relative h-[400px] bg-white rounded-xl shadow-sm border p-4">
                    <h2 className="text-xl font-semibold mb-4">Chat Badge Menu</h2>
                    <p className="text-sm text-muted-foreground mb-8">
                        Floating badge that expands into a chat interface
                    </p>
                    <ChatBadgeMenu position="absolute" anchor="bottom-right" />
                </div>
            </div>
        </div>
    );
} 