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
import { CommentPane } from '@/app/components/comments/comment-pane';
import { CommentToggle } from '@/app/components/comments/comment-toggle';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Mock documents - in a real app, this would come from a database
const mockDocuments = [
  { id: '1', title: 'Hidden Powers Fantasy Tale' },
  { id: '2', title: 'Untitled Document' },
];

// Mock comments - in a real app, this would come from a database
const mockComments = [
  {
    id: '1',
    author: 'Alice',
    content: 'This part needs more detail about the character\'s motivation.',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    author: 'Bob',
    content: 'Great description of the magical system here!',
    timestamp: '5 hours ago'
  },
];

export default function Home() {
  const [currentDocId, setCurrentDocId] = useState('1');
  const [documents, setDocuments] = useState(mockDocuments);
  const [editorWidth, setEditorWidth] = useState<'normal' | 'wide' | 'full'>('normal');
  const [isCommentPaneOpen, setIsCommentPaneOpen] = useState(false);

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
          <div className="flex items-center justify-between mb-4 relative z-50">
            <DocumentHeader
              title={currentDoc?.title || 'Untitled'}
              onTitleChange={handleTitleChange}
            />
            <div className="flex items-center gap-4">
              <WidthSelector currentWidth={editorWidth} onChange={setEditorWidth} />
              <CommentToggle
                isOpen={isCommentPaneOpen}
                onClick={() => setIsCommentPaneOpen(!isCommentPaneOpen)}
                commentCount={mockComments.length}
              />
              <StorageStatus status={status} error={error} />
            </div>
          </div>
          <div className="relative flex-1">
            {/* Main content area */}
            <motion.div
              className="w-full h-[calc(100vh-theme(spacing.20))] antialiased md:my-10 pb-20"
              animate={{
                paddingRight: isCommentPaneOpen ? "400px" : "40px",
                paddingLeft: "40px"
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <div style={{ margin: '0 auto', lineHeight: '28px', ...widthStyles[editorWidth] }}>
                <Editor content={content} onChange={handleContentChange} />
              </div>
            </motion.div>

            {/* Comment pane */}
            <AnimatePresence>
              {isCommentPaneOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.2,
                    delay: isCommentPaneOpen ? 0.15 : 0,
                  }}
                  className="fixed top-0 right-0 h-[calc(100vh-72px)] w-[400px] bg-background border-l"
                >
                  <CommentPane isOpen={isCommentPaneOpen} comments={mockComments} />
                </motion.div>
              )}
            </AnimatePresence>
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
