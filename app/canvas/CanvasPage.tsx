'use client';

import React, { useState, useCallback } from 'react';
import { Canvas } from '@/app/components/Canvas/Canvas';
import { BaseNode } from '@/app/utils/types';
import { nodeRegistry } from '@/app/utils/nodeRegistry';
import { ImageContent, FileContent } from '@/app/components/Nodes';
// Import this to register all node types
import '@/app/components/Nodes';

export default function CanvasPage() {
  const [nodes, setNodes] = useState<BaseNode[]>([]);

  const handleNodesChange = useCallback((updatedNodes: BaseNode[]) => {
    console.log('Nodes updated:', {
      previous: nodes.map(n => ({ id: n.id, type: n.type })),
      new: updatedNodes.map(n => ({ id: n.id, type: n.type })),
      diff: updatedNodes.filter(n1 => !nodes.find(n2 => n2.id === n1.id))
    });
    setNodes(updatedNodes);
  }, [nodes]);

  const getNodePosition = (e: { clientX: number; clientY: number }) => {
    // Get canvas element's position
    const canvas = document.querySelector('.canvas');
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePaste = useCallback(async (e: ClipboardEvent) => {
    e.preventDefault();

    const position = getNodePosition({
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2,
    });

    // Handle image paste
    const items = Array.from(e.clipboardData?.items || []);
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          const url = URL.createObjectURL(file);
          const img = new Image();
          
          img.onload = () => {
            const node = nodeRegistry.createNode<ImageContent>(
              'image',
              {
                url,
                originalWidth: img.width,
                originalHeight: img.height,
              },
              position
            );
            setNodes(prev => [...prev, node]);
          };
          
          img.src = url;
        }
      }
    }

    // Handle text paste
    const text = e.clipboardData?.getData('text');
    if (text) {
      // Check if it's a URL
      try {
        const url = new URL(text);
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          const node = nodeRegistry.createNode(
            'iframe',
            { url, sandboxPermissions: ['allow-same-origin', 'allow-scripts'] },
            position
          );
          setNodes(prev => [...prev, node]);
          return;
        }
      } catch {
        // Not a URL, create text node
        const node = nodeRegistry.createNode(
          'text',
          { text, backgroundColor: '#fff9c4' },
          position
        );
        setNodes(prev => [...prev, node]);
      }
    }
  }, []);

  const handleDrop = useCallback(async (e: DragEvent) => {
    e.preventDefault();

    const position = getNodePosition(e);

    if (e.dataTransfer?.files.length) {
      const file = e.dataTransfer.files[0];
      
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        const img = new Image();
        
        img.onload = () => {
          const node = nodeRegistry.createNode<ImageContent>(
            'image',
            {
              url,
              originalWidth: img.width,
              originalHeight: img.height,
            },
            position
          );
          setNodes(prev => [...prev, node]);
        };
        
        img.src = url;
      } else {
        // Handle other file types
        const node = nodeRegistry.createNode<FileContent>(
          'file',
          {
            name: file.name,
            type: file.type,
            size: file.size,
            url: URL.createObjectURL(file),
          },
          position
        );
        setNodes(prev => [...prev, node]);
      }
    }
  }, []);

  // Add event listeners for paste and drop
  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', (e) => e.preventDefault());

    return () => {
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragover', (e) => e.preventDefault());
    };
  }, [handlePaste, handleDrop]);

  return (
    <main className="w-screen h-screen bg-gray-50">
      <div className="absolute top-4 right-4 z-10 text-sm text-gray-500">
        Drag & drop files or paste content
      </div>
      <Canvas
        nodes={nodes}
        onNodesChange={handleNodesChange}
      />
    </main>
  );
}