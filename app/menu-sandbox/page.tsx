'use client';

import { ExpandingIconMenu } from "@/app/components/floating-menus/expanding-icon-menu";
import { VerticalIconMenu } from "@/app/components/floating-menus/vertical-icon-menu";
import { NestedIconMenu } from "@/app/components/floating-menus/nested-icon-menu";
import { ChatBadgeMenu } from "@/app/components/floating-menus/chat-badge-menu";
import { RadialQuickMenu } from "@/app/components/floating-menus/radial-quick-menu";
import { SmartContextMenu } from "@/app/components/floating-menus/smart-context-menu";

const SAMPLE_TEXTS = {
    quote: '"The only way to do great work is to love what you do." - Steve Jobs',
    link: 'https://example.com/article',
    word: 'serendipity',
    long: 'This is a longer piece of text that would benefit from summarization or improvement. It contains multiple sentences and ideas that could be made more concise or clearer. The AI could help restructure this for better readability.',
};

export default function MenuSandbox() {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-3xl font-bold mb-8">Menu Sandbox</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Original menus */}
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

                {/* New menus */}
                <div className="relative h-[400px] bg-white rounded-xl shadow-sm border p-4">
                    <h2 className="text-xl font-semibold mb-4">Radial Quick Menu</h2>
                    <p className="text-sm text-muted-foreground mb-8">
                        Circular menu with quick formatting actions
                    </p>
                    <RadialQuickMenu
                        position="absolute"
                        anchor="center-right"
                        onAction={(action) => console.log('Quick action:', action)}
                    />
                </div>

                <div className="relative h-[400px] bg-white rounded-xl shadow-sm border p-4">
                    <h2 className="text-xl font-semibold mb-4">Smart Context Menu</h2>
                    <p className="text-sm text-muted-foreground mb-8">
                        Context-aware menu that adapts to selected text
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(SAMPLE_TEXTS).map(([type, text]) => (
                            <div key={type} className="relative">
                                <SmartContextMenu
                                    position="absolute"
                                    anchor="bottom-right"
                                    selectedText={text}
                                    onAction={(action, text) => console.log('Context action:', action, text)}
                                />
                                <div className="text-xs font-medium mb-1 capitalize">{type}:</div>
                                <div className="text-sm p-2 rounded bg-muted/50">
                                    {text}
                                </div>
                            </div>
                        ))}
                    </div>
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