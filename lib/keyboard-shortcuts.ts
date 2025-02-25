import { Action, ActionImpl } from 'kbar';
import { FileText, Sidebar, Maximize2, Search, Save, Command, Eraser, Undo, Redo } from 'lucide-react';
import { ComponentType } from 'react';

export type ShortcutAction = {
    id: string;
    name: string;
    shortcut?: string[];
    section?: string;
    subtitle?: string;
    keywords?: string;
    perform: (actionImpl?: ActionImpl) => void;
    icon?: ComponentType;
};

const createAction = (action: ShortcutAction): Action => ({
    ...action,
    icon: action.icon as unknown as Action['icon'],
    perform: (actionImpl: ActionImpl) => action.perform(actionImpl),
});

export const actions = [
    createAction({
        id: 'toggle-sidebar',
        name: 'Toggle Sidebar',
        shortcut: ['⌘', 'B'],
        section: 'View',
        icon: Sidebar,
        perform: () => document.dispatchEvent(new CustomEvent('toggle-sidebar')),
    }),
    createAction({
        id: 'zen-mode',
        name: 'Toggle Zen Mode',
        shortcut: ['⌘', '\\'],
        section: 'View',
        icon: Maximize2,
        perform: () => document.dispatchEvent(new CustomEvent('toggle-zen-mode')),
    }),
    createAction({
        id: 'command-palette',
        name: 'Command Palette',
        shortcut: ['⌘', 'K'],
        section: 'General',
        icon: Command,
        perform: () => document.dispatchEvent(new CustomEvent('show-command-palette')),
    }),
    createAction({
        id: 'quick-actions',
        name: 'Quick Actions',
        shortcut: ['⌘', 'L'],
        section: 'General',
        icon: Command,
        perform: () => document.dispatchEvent(new CustomEvent('show-quick-actions')),
    }),
    createAction({
        id: 'save',
        name: 'Save Document',
        shortcut: ['⌘', 'S'],
        section: 'File',
        icon: Save,
        perform: () => document.dispatchEvent(new CustomEvent('save-document')),
    }),
    createAction({
        id: 'search',
        name: 'Search in Document',
        shortcut: ['⌘', 'F'],
        section: 'Edit',
        icon: Search,
        perform: () => document.dispatchEvent(new CustomEvent('show-search')),
    }),
    createAction({
        id: 'new-document',
        name: 'New Document',
        shortcut: ['⌘', 'N'],
        section: 'File',
        icon: FileText,
        perform: () => document.dispatchEvent(new CustomEvent('new-document')),
    }),
    createAction({
        id: 'cleanup-content',
        name: 'Clean Up Content',
        shortcut: ['⌘', 'Shift', 'L'],
        section: 'Edit',
        icon: Eraser,
        perform: () => document.dispatchEvent(new CustomEvent('cleanup-content')),
    }),
    createAction({
        id: 'undo',
        name: 'Undo',
        shortcut: ['⌘', 'Z'],
        section: 'Edit',
        icon: Undo,
        perform: () => document.dispatchEvent(new CustomEvent('undo')),
    }),
    createAction({
        id: 'redo',
        name: 'Redo',
        shortcut: ['⌘', 'Shift', 'Z'],
        section: 'Edit',
        icon: Redo,
        perform: () => document.dispatchEvent(new CustomEvent('redo')),
    }),
] as Action[];

// Helper to register keyboard shortcuts
export function registerShortcuts() {
    const handleKeyDown = (event: KeyboardEvent) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modifier = isMac ? event.metaKey : event.ctrlKey;
        const shift = event.shiftKey;

        actions.forEach(action => {
            if (!action.shortcut) return;

            const key = action.shortcut[action.shortcut.length - 1];
            const requiresShift = action.shortcut.includes('Shift');

            if (
                modifier &&
                event.key.toLowerCase() === key.toLowerCase() &&
                shift === requiresShift
            ) {
                event.preventDefault();
                if (typeof action.perform === 'function') {
                    action.perform(new ActionImpl(action, {}, 0));
                }
            }
        });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
} 