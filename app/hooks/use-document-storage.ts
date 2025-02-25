import { useState, useEffect, useCallback } from 'react';
import { storageManager } from '@/app/lib/storage';

export type StorageStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface UseDocumentStorageReturn {
    content: string;
    setContent: (newContent: string) => void;
    status: StorageStatus;
    error: Error | null;
}

export function useDocumentStorage(docId: string, initialContent: string = ''): UseDocumentStorageReturn {
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<StorageStatus>('idle');
    const [error, setError] = useState<Error | null>(null);
    const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

    // Load initial content
    useEffect(() => {
        try {
            const savedContent = storageManager.loadContent(docId);
            if (savedContent !== null) {
                console.log('Loaded content:', savedContent);
                // If we have saved content, use it
                setContent(savedContent);
                setStatus('saved');
            } else {
                // No saved content, use initial content
                setContent(initialContent);
                // Save the initial content to storage
                storageManager.saveContent(docId, initialContent);
                setStatus('saved');
            }
        } catch (e) {
            setError(e instanceof Error ? e : new Error('Failed to load content'));
            setStatus('error');
        }
    }, [docId, initialContent]);

    const saveContent = useCallback((newContent: string) => {
        setStatus('saving');
        try {
            storageManager.saveContent(docId, newContent);
            setStatus('saved');
            setError(null);
        } catch (e) {
            setError(e instanceof Error ? e : new Error('Failed to save content'));
            setStatus('error');
        }
    }, [docId]);

    // Debounced content updates
    const updateContent = useCallback((newContent: string) => {
        setContent(newContent);
        setStatus('saving');

        // Clear existing timeout
        if (saveTimeout) {
            clearTimeout(saveTimeout);
        }

        // Set new timeout
        const timeout = setTimeout(() => {
            saveContent(newContent);
        }, 1000); // 1 second debounce

        setSaveTimeout(timeout);
    }, [saveContent, saveTimeout]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (saveTimeout) {
                clearTimeout(saveTimeout);
            }
        };
    }, [saveTimeout]);

    return {
        content,
        setContent: updateContent,
        status,
        error
    };
} 