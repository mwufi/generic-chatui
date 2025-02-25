import { useEffect } from 'react';
import { useKBar } from 'kbar';
import { registerShortcuts } from '@/lib/keyboard-shortcuts';

export function useKeyboardShortcuts() {
    const { query } = useKBar();

    useEffect(() => {
        // Register global keyboard shortcuts
        const cleanup = registerShortcuts();

        // Register kbar-specific shortcuts
        const handleKeyDown = (event: KeyboardEvent) => {
            // Command/Ctrl + K to open command palette
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                query.toggle();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            cleanup();
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [query]);
} 