'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { BaseNodeWrapper } from './BaseNode';
import { BaseNode } from '@/app/utils/types';
import styles from '../Canvas/Canvas.module.css';

export interface ImageContent {
  url: string;
  originalWidth: number;
  originalHeight: number;
  alt?: string;
}

export interface ImageNodeProps {
  node: BaseNode;
  selected: boolean;
  onSelect: () => void;
  onResize?: (width: number, height: number) => void;
  onMove?: (x: number, y: number) => void;
}

export const ImageNode: React.FC<ImageNodeProps> = ({
  node,
  selected,
  onSelect,
  onResize,
  onMove,
}) => {
  const content = node.content as ImageContent;
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle image load to get original dimensions
  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    setError(null);
  }, []);

  // Handle image load error
  const handleImageError = useCallback(() => {
    setError('Failed to load image');
    setIsLoaded(false);
  }, []);

  // Custom resize handler to maintain aspect ratio
  const handleResize = useCallback((width: number, height: number) => {
    if (!onResize || !content.originalWidth || !content.originalHeight) return;

    const aspectRatio = content.originalWidth / content.originalHeight;
    let newWidth = width;
    let newHeight = height;

    // Maintain aspect ratio based on which dimension changed more
    const widthChange = Math.abs(width - node.dimensions.width);
    const heightChange = Math.abs(height - node.dimensions.height);

    if (widthChange > heightChange) {
      newHeight = width / aspectRatio;
    } else {
      newWidth = height * aspectRatio;
    }

    onResize(newWidth, newHeight);
  }, [onResize, content.originalWidth, content.originalHeight, node.dimensions]);

  const handleDoubleClick = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const handleExitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  return (
    <BaseNodeWrapper
      node={node}
      selected={selected}
      onSelect={onSelect}
      onResize={handleResize}
      onMove={onMove}
      isFullscreen={isFullscreen}
    >
      <div
        className={styles.imageNode}
        onDoubleClick={handleDoubleClick}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {error ? (
          <div className={styles.errorMessage}>
            {error}
          </div>
        ) : (
          <>
            <img
              src={content.url}
              alt={content.alt || 'Image'}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.2s ease',
              }}
            />
            {!isLoaded && (
              <div className={styles.loader}>
                Loading...
              </div>
            )}
          </>
        )}
        
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
export const imageNodeConfig = {
  type: 'image' as const,
  component: ImageNode,
  defaultDimensions: { width: 300, height: 200 },
  canResize: true,
  canRotate: true,
  create: (data: { url: string; dimensions?: { width: number; height: number } }) => ({
    content: {
      url: data.url,
      originalWidth: data.dimensions?.width || 300,
      originalHeight: data.dimensions?.height || 200,
    } as ImageContent,
  }),
};