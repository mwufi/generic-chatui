'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BaseNodeWrapper } from './BaseNode';
import { BaseNode } from '@/app/utils/types';
import styles from '../Canvas/Canvas.module.css';

export interface PromptContent {
  title: string;
  content: string;
  tags?: string[];
  lastEdited?: string;
}

export interface PromptNodeProps {
  node: BaseNode;
  selected: boolean;
  onSelect: () => void;
  onResize?: (width: number, height: number) => void;
  onMove?: (x: number, y: number) => void;
  onChange?: (content: PromptContent) => void;
}

export const PromptNode: React.FC<PromptNodeProps> = ({
  node,
  selected,
  onSelect,
  onResize,
  onMove,
  onChange,
}) => {
  const content = node.content as PromptContent;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(content.title);
  const [text, setText] = useState(content.content);
  const [tags, setTags] = useState(content.tags || []);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  // Auto-save timer
  const autoSaveTimerRef = useRef<ReturnType<typeof setInterval>>();

  const handleSave = useCallback(() => {
    if (onChange) {
      onChange({
        title,
        content: text,
        tags,
        lastEdited: new Date().toISOString(),
      });
    }
  }, [title, text, tags, onChange]);

  // Set up auto-save
  useEffect(() => {
    if (isEditing) {
      autoSaveTimerRef.current = setInterval(handleSave, 30000); // Auto-save every 30 seconds
      return () => {
        if (autoSaveTimerRef.current) {
          clearInterval(autoSaveTimerRef.current);
        }
      };
    }
  }, [isEditing, handleSave]);

  const handleDoubleClick = useCallback(() => {
    setIsFullscreen(true);
    setIsEditing(true);
  }, []);

  const handleExitFullscreen = useCallback(() => {
    handleSave();
    setIsFullscreen(false);
    setIsEditing(false);
  }, [handleSave]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleExitFullscreen();
    } else if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  }, [handleExitFullscreen, handleSave]);

  const handleTagAdd = useCallback((newTag: string) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  }, [tags]);

  const handleTagRemove = useCallback((tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }, [tags]);

  // Focus management
  useEffect(() => {
    if (isFullscreen && isEditing) {
      titleRef.current?.focus();
    }
  }, [isFullscreen, isEditing]);

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
        className={`${styles.promptNode} ${isFullscreen ? styles.fullscreen : ''}`}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
      >
        {isFullscreen ? (
          <div className={styles.promptEditor}>
            <div className={styles.promptToolbar}>
              <input
                ref={titleRef}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.promptTitle}
                placeholder="Enter title..."
              />
              <button
                onClick={handleExitFullscreen}
                className={styles.exitButton}
              >
                Exit
              </button>
            </div>
            <textarea
              ref={editorRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.promptContent}
              placeholder="Start writing..."
            />
            <div className={styles.promptFooter}>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                    <button
                      onClick={() => handleTagRemove(tag)}
                      className={styles.removeTag}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Add tag..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleTagAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className={styles.tagInput}
                />
              </div>
              <div className={styles.lastEdited}>
                {content.lastEdited && `Last edited: ${new Date(content.lastEdited).toLocaleString()}`}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.promptPreview}>
            <h3 className={styles.previewTitle}>{title}</h3>
            <p className={styles.previewContent}>
              {text.length > 100 ? `${text.slice(0, 100)}...` : text}
            </p>
            {tags.length > 0 && (
              <div className={styles.previewTags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </BaseNodeWrapper>
  );
};

// Node registration
export const promptNodeConfig = {
  type: 'prompt' as const,
  component: PromptNode,
  defaultDimensions: { width: 300, height: 200 },
  canResize: true,
  canRotate: false,
  create: (title: string = 'New Prompt') => ({
    content: {
      title,
      content: '',
      tags: [],
      lastEdited: new Date().toISOString(),
    } as PromptContent,
  }),
};