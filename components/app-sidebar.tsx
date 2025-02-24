import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/ui/sidebar"

interface Document {
    id: string
    title: string
}

interface AppSidebarProps {
    documents?: Document[]
    currentDocId?: string
    onDocumentSelect?: (id: string) => void
}

export function AppSidebar({
    documents = [],
    currentDocId,
    onDocumentSelect,
}: AppSidebarProps) {
    return (
        <Sidebar className="border-r">
            <div className="flex h-16 items-center border-b px-4">
                <h2 className="text-lg font-semibold">Documents</h2>
            </div>
            <div className="flex-1 overflow-auto py-2">
                {documents.map((doc) => (
                    <Button
                        key={doc.id}
                        variant="ghost"
                        className={`w-full justify-start px-4 ${doc.id === currentDocId ? "bg-muted" : ""
                            }`}
                        onClick={() => onDocumentSelect?.(doc.id)}
                    >
                        {doc.title}
                    </Button>
                ))}
            </div>
        </Sidebar>
    )
} 