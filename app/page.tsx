'use client';

import { useState } from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import { Editor } from '@/app/components/Editor';
import { sampleText } from './sample-text';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Mock documents - in a real app, this would come from a database
const mockDocuments = [
  { id: '1', title: 'Sample Story' },
  { id: '2', title: 'Untitled Document' },
];

export default function Home() {
  const [currentDocId, setCurrentDocId] = useState('1');
  const [content, setContent] = useState(sampleText);

  const handleDocumentSelect = (id: string) => {
    setCurrentDocId(id);
    // In a real app, we would fetch the document content here
    if (id === '1') {
      setContent(sampleText);
    } else {
      setContent('');
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        documents={mockDocuments}
        currentDocId={currentDocId}
        onDocumentSelect={handleDocumentSelect}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 bg-gradient-to-b from-background to-transparent z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {mockDocuments.find(doc => doc.id === currentDocId)?.title || 'Document'}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex-1 antialiased" style={{ lineHeight: '28px' }}>
          <Editor content={content} onChange={setContent} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
