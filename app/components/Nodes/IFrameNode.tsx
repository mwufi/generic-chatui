'use client';

import React, { useState, useCallback } from 'react';
import { BaseNodeWrapper } from './BaseNode';
import { BaseNode } from '@/app/utils/types';
import styles from '../Canvas/Canvas.module.css';

export interface IFrameContent {
  url: string;
  sandboxPermissions?: string[];
}

export interface IFrameNodeProps {
  node: BaseNode;
  selected: boolean;
  onSelect: () => void;
  onResize?: (width: number, height: number) => void;
  onMove?: (x: number, y: number) => void;
}

export const IFrameNode: React.FC<IFrameNodeProps> = ({
  node,
  selected,
  onSelect,
  onResize,
  onMove,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const content = node.content as IFrameContent;

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen(true);
  }, []);

  const handleExitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  // Default sandbox permissions for security
  const defaultSandbox = [
    'allow-scripts',
    'allow-same-origin',
    'allow-forms',
    'allow-popups',
  ];

  const sandboxPermissions = content.sandboxPermissions || defaultSandbox;

  return (
    <BaseNodeWrapper
      node={node}
      selected={selected}
      onSelect={onSelect}
      onResize={onResize}
      onMove={onMove}
      isFullscreen={isFullscreen}
    >
      <div
        className={styles.iframeNode}
        onDoubleClick={handleDoubleClick}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        {/* Interaction overlay - always present except in fullscreen */}
        {!isFullscreen && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'transparent',
              zIndex: 1,
              pointerEvents: selected ? 'none' : 'auto', // Allow interaction when selected
            }}
          />
        )}

        <iframe
          src={content.url}
          sandbox={sandboxPermissions.join(' ')}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: isFullscreen ? 0 : '4px',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />

        {/* Fullscreen controls */}
        {isFullscreen && (
          <button
            onClick={handleExitFullscreen}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10000,
              padding: '8px 16px',
              background: '#000000cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Exit Fullscreen
          </button>
        )}
      </div>
    </BaseNodeWrapper>
  );
};

// Node registration
export const iframeNodeConfig = {
  type: 'iframe' as const,
  component: IFrameNode,
  defaultDimensions: { width: 600, height: 400 },
  canResize: true,
  canRotate: false,
  create: (url: string) => ({
    content: {
      url,
      sandboxPermissions: [
        'allow-scripts',
        'allow-same-origin',
        'allow-forms',
        'allow-popups',
      ],
    } as IFrameContent,
  }),
};