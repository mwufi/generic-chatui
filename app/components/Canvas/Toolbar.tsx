'use client';

import React, { useCallback } from 'react';
import { nodeRegistry } from '@/app/utils/nodeRegistry';
import styles from './Canvas.module.css';

interface ToolbarProps {
  onAddNode: (node: any) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetView?: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddNode,
  onZoomIn,
  onZoomOut,
  onResetView,
}) => {
  const handleAddTextNode = useCallback(() => {
    const node = nodeRegistry.createNode(
      'text',
      { text: 'New note', backgroundColor: '#fff9c4' },
      { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 75 }
    );
    onAddNode(node);
  }, [onAddNode]);

  const handleAddPromptNode = useCallback(() => {
    const node = nodeRegistry.createNode(
      'prompt',
      { title: 'New Prompt', content: '', tags: [] },
      { x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 100 }
    );
    onAddNode(node);
  }, [onAddNode]);

  const handleAddIframe = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      try {
        new URL(url); // Validate URL
        const node = nodeRegistry.createNode(
          'iframe',
          { url, sandboxPermissions: ['allow-same-origin', 'allow-scripts'] },
          { x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 200 }
        );
        onAddNode(node);
      } catch {
        alert('Please enter a valid URL');
      }
    }
  }, [onAddNode]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolGroup}>
        <button
          onClick={handleAddTextNode}
          className={styles.toolButton}
          title="Add Text Note"
        >
          <span className={styles.icon}>📝</span>
        </button>
        <button
          onClick={handleAddPromptNode}
          className={styles.toolButton}
          title="Add Prompt"
        >
          <span className={styles.icon}>📄</span>
        </button>
        <button
          onClick={handleAddIframe}
          className={styles.toolButton}
          title="Add IFrame"
        >
          <span className={styles.icon}>🔗</span>
        </button>
      </div>

      <div className={styles.toolGroup}>
        <button
          onClick={onZoomIn}
          className={styles.toolButton}
          title="Zoom In"
        >
          <span className={styles.icon}>➕</span>
        </button>
        <button
          onClick={onZoomOut}
          className={styles.toolButton}
          title="Zoom Out"
        >
          <span className={styles.icon}>➖</span>
        </button>
        <button
          onClick={onResetView}
          className={styles.toolButton}
          title="Reset View"
        >
          <span className={styles.icon}>🔄</span>
        </button>
      </div>

      <div className={styles.toolGroup}>
        <div className={styles.hint}>
          Space + Drag to pan
          <br />
          Scroll to zoom
          <br />
          Shift + Click to multi-select
        </div>
      </div>
    </div>
  );
};