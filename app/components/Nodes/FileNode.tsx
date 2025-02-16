'use client';

import React, { useState, useCallback } from 'react';
import { BaseNodeWrapper } from './BaseNode';
import { BaseNode } from '@/app/utils/types';
import styles from '../Canvas/Canvas.module.css';

export interface FileContent {
  name: string;
  type: string;
  size: number;
  url: string;
  previewUrl?: string;
}

export interface FileNodeProps {
  node: BaseNode;
  selected: boolean;
  onSelect: () => void;
  onResize?: (width: number, height: number) => void;
  onMove?: (x: number, y: number) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const getFileIcon = (type: string): string => {
  // This would be replaced with actual icon paths
  const icons: Record<string, string> = {
    'application/pdf': '/icons/pdf.svg',
    'image/': '/icons/image.svg',
    'video/': '/icons/video.svg',
    'audio/': '/icons/audio.svg',
    'text/': '/icons/text.svg',
  };

  // Find matching icon based on MIME type
  const matchingType = Object.keys(icons).find(key => type.startsWith(key));
  return matchingType ? icons[matchingType] : '/icons/file.svg';
};

export const FileNode: React.FC<FileNodeProps> = ({
  node,
  selected,
  onSelect,
  onResize,
  onMove,
}) => {
  const content = node.content as FileContent;
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(content.url, '_blank');
  }, [content.url]);

  const handlePreviewToggle = useCallback(() => {
    if (content.previewUrl) {
      setShowPreview(!showPreview);
    }
  }, [content.previewUrl]);

  const canPreview = content.previewUrl && (
    content.type.startsWith('image/') ||
    content.type === 'application/pdf' ||
    content.type.startsWith('text/')
  );

  return (
    <BaseNodeWrapper
      node={node}
      selected={selected}
      onSelect={onSelect}
      onResize={onResize}
      onMove={onMove}
    >
      <div className={styles.fileNode}>
        {showPreview && canPreview ? (
          <div className={styles.filePreview}>
            {content.type.startsWith('image/') ? (
              <img
                src={content.previewUrl}
                alt={content.name}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            ) : content.type === 'application/pdf' ? (
              <iframe
                src={content.previewUrl}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title={content.name}
              />
            ) : (
              <pre className={styles.textPreview}>
                {/* Text preview would be loaded here */}
                Loading preview...
              </pre>
            )}
            <button
              onClick={handlePreviewToggle}
              className={styles.previewToggle}
            >
              Close Preview
            </button>
          </div>
        ) : (
          <div className={styles.fileInfo}>
            <img
              src={getFileIcon(content.type)}
              alt={content.type}
              className={styles.icon}
            />
            <div className={styles.fileDetails}>
              <div className={styles.fileName} title={content.name}>
                {content.name}
              </div>
              <div className={styles.fileSize}>
                {formatFileSize(content.size)}
              </div>
            </div>
            <div className={styles.fileActions}>
              {canPreview && (
                <button
                  onClick={handlePreviewToggle}
                  className={styles.previewButton}
                >
                  Preview
                </button>
              )}
              <button
                onClick={handleDownload}
                className={styles.downloadButton}
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </BaseNodeWrapper>
  );
};

// Node registration
export const fileNodeConfig = {
  type: 'file' as const,
  component: FileNode,
  defaultDimensions: { width: 250, height: 100 },
  canResize: true,
  canRotate: false,
  create: (data: FileContent) => ({
    content: data,
  }),
};