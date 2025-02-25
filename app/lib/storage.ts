export interface StorageManager {
    saveContent: (docId: string, content: string) => void;
    loadContent: (docId: string) => string | null;
    getAllDocIds: () => string[];
    deleteContent: (docId: string) => void;
    debug?: () => void;
}

export class LocalStorageManager implements StorageManager {
    private readonly PREFIX = 'doc:';

    private getKey(docId: string): string {
        return `${this.PREFIX}${docId}`;
    }

    saveContent(docId: string, content: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.getKey(docId), content);
            // Update the list of document IDs
            const docIds = this.getAllDocIds();
            if (!docIds.includes(docId)) {
                docIds.push(docId);
                localStorage.setItem(`${this.PREFIX}ids`, JSON.stringify(docIds));
            }
        }
    }

    loadContent(docId: string): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.getKey(docId));
        }
        return null;
    }

    getAllDocIds(): string[] {
        if (typeof window !== 'undefined') {
            const idsString = localStorage.getItem(`${this.PREFIX}ids`);
            return idsString ? JSON.parse(idsString) : [];
        }
        return [];
    }

    deleteContent(docId: string): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.getKey(docId));
            // Update the list of document IDs
            const docIds = this.getAllDocIds().filter(id => id !== docId);
            localStorage.setItem(`${this.PREFIX}ids`, JSON.stringify(docIds));
        }
    }

    debug(): void {
        if (typeof window !== 'undefined') {
            const docIds = this.getAllDocIds();
            console.log('Storage Debug:');
            console.log('Document IDs:', docIds);
            docIds.forEach(id => {
                console.log(`Document ${id}:`, this.loadContent(id));
            });
        }
    }
}

// Export a singleton instance
export const storageManager = new LocalStorageManager(); 