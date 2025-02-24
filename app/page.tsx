'use client';

import { useState } from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import { Editor } from '@/app/components/Editor';
import { DocumentHeader } from '@/app/components/document-header';
import { sampleText } from './sample-text';
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

// Mock documents - in a real app, this would come from a database
const mockDocuments = [
  { id: '1', title: 'Hidden Powers Fantasy Tale' },
  { id: '2', title: 'Untitled Document' },
];

export default function Home() {
  const [currentDocId, setCurrentDocId] = useState('1');
  const [content, setContent] = useState(sampleText);
  const [documents, setDocuments] = useState(mockDocuments);

  const handleDocumentSelect = (id: string) => {
    setCurrentDocId(id);
    // In a real app, we would fetch the document content here
    if (id === '1') {
      setContent(sampleText);
    } else {
      setContent('');
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // console.log('Content changed:', newContent);
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
    <SidebarProvider>
      {/* <AppSidebar
        documents={documents}
        currentDocId={currentDocId}
        onDocumentSelect={handleDocumentSelect}
      /> */}
      <SidebarInset>
        <DocumentHeader
          title={currentDoc?.title || 'Untitled'}
          onTitleChange={handleTitleChange}
        />
        <div className="flex-1 antialiased font-serif" style={{ lineHeight: '28px' }}>
          <Editor content={content} onChange={handleContentChange} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
