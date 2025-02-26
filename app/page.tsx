'use client';

import { useState } from 'react';
import { Editor } from '@/app/components/Editor';
import { DocumentHeader } from '@/app/components/document-header';
import { sampleText } from './sample-text';
import { EditorMenu } from '@/app/components/floating-menus/editor-menu';
import { useDocumentStorage } from '@/app/hooks/use-document-storage';
import { StorageStatus } from '@/app/components/storage-status';
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { WidthSelector } from '@/app/components/width-selector';

// Mock documents - in a real app, this would come from a database
const mockDocuments = [
  { id: '1', title: 'Hidden Powers Fantasy Tale' },
  { id: '2', title: 'Untitled Document' },
];

export default function Home() {
  const [currentDocId, setCurrentDocId] = useState('1');
  const [documents, setDocuments] = useState(mockDocuments);
  const [editorWidth, setEditorWidth] = useState<'normal' | 'wide' | 'full'>('normal');

  const widthStyles = {
    normal: { '--typingarea-max-width': '600px' },
    wide: { '--typingarea-max-width': '800px' },
    full: { '--typingarea-max-width': '1200px' }
  } as const;

  const {
    content,
    setContent: handleContentChange,
    status,
    error
  } = useDocumentStorage(
    currentDocId,
    // Only provide sample text as initial content for doc 1
    currentDocId === '1' ? sampleText : ''
  );

  const handleDocumentSelect = (id: string) => {
    setCurrentDocId(id);
  };

  const handleTitleChange = (newTitle: string) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === currentDocId ? { ...doc, title: newTitle } : doc
      )
    );
  };

  const currentDoc = documents.find(doc => doc.id === currentDocId);

  return (
    <div className="h-screen overscroll-none">
      <SidebarProvider>
        {/* <AppSidebar
        documents={documents}
        currentDocId={currentDocId}
        onDocumentSelect={handleDocumentSelect}
      /> */}
        <SidebarInset>
          <div className="flex items-center justify-between">
            <DocumentHeader
              title={currentDoc?.title || 'Untitled'}
              onTitleChange={handleTitleChange}
            />
            <div className="flex items-center gap-4">
              <WidthSelector currentWidth={editorWidth} onChange={setEditorWidth} />
              <StorageStatus status={status} error={error} />
            </div>
          </div>
          <div
            className="flex-1 h-[calc(100vh-theme(spacing.20))] antialiased md:mx-10 md:my-10 pb-20"
            style={{ lineHeight: '28px', ...widthStyles[editorWidth] }}
          >
            <Editor content={content} onChange={handleContentChange} />
          </div>
          <EditorMenu
            content={content}
            onCleanupContent={() => {
              // TODO: Implement cleanup logic
              console.log('Cleanup content triggered');
            }}
          />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
