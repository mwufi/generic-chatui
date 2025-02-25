import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, KBarResults, useMatches } from 'kbar';
import { actions } from '@/lib/keyboard-shortcuts';

function RenderResults() {
    const { results } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) => {
                if (typeof item === 'string') {
                    return <div className="px-4 py-2 text-sm text-muted-foreground">{item}</div>;
                }

                const Icon = (item as any).icon;

                return (
                    <div
                        className={`px-4 py-2 flex items-center justify-between ${active ? 'bg-accent' : 'bg-transparent'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            {Icon && <Icon className="w-4 h-4" />}
                            <div>
                                <div>{item.name}</div>
                                {item.subtitle && (
                                    <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                                )}
                            </div>
                        </div>
                        {item.shortcut?.length ? (
                            <div className="flex items-center gap-1">
                                {item.shortcut.map((sc: string) => (
                                    <kbd
                                        key={sc}
                                        className="px-2 py-1 text-xs rounded bg-muted"
                                    >
                                        {sc}
                                    </kbd>
                                ))}
                            </div>
                        ) : null}
                    </div>
                );
            }}
        />
    );
}

export function CommandPalette() {
    return (
        <KBarPortal>
            <KBarPositioner className="bg-background/80 backdrop-blur-sm z-50">
                <KBarAnimator className="w-full max-w-[600px] rounded-lg border bg-background shadow-lg overflow-hidden">
                    <div className="p-4 border-b">
                        <KBarSearch className="w-full bg-transparent outline-none placeholder:text-muted-foreground" />
                    </div>
                    <div className="px-2 py-4">
                        <RenderResults />
                    </div>
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
    );
}

export function KBarWrapper({ children }: { children: React.ReactNode }) {
    return (
        <KBarProvider
            actions={actions}
            options={{
                animations: {
                    enterMs: 100,
                    exitMs: 100
                },
                callbacks: {
                    onOpen: () => console.log("Command palette opened"),
                    onClose: () => console.log("Command palette closed"),
                }
            }}
        >
            <CommandPalette />
            {children}
        </KBarProvider>
    );
} 