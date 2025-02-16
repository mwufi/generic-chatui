'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BaseNodeWrapper } from './BaseNode';
import { BaseNode } from '@/app/utils/types';
import styles from '../Canvas/Canvas.module.css';

export interface TextContent {
  text: string;
  color?: string;
  backgroundColor?: string;
}

export interface TextNodeProps {
  node: BaseNode;
  selected: boolean;
  onSelect: () => void;
  onResize?: (width: number, height: number) => void;
  onMove?: (x: number, y: number) => void;
  onChange?: (content: TextContent) => void;
}

export const TextNode: React.FC<TextNodeProps> = ({
  node,
  selected,
  onSelect,
  onResize,
  onMove,
  onChange,
}) => {
  const content = node.content as TextContent;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content.text);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (onChange && text !== content.text) {
      onChange({
        ...content,
        text,
      });
    }
  }, [text, content, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setText(content.text); // Reset to original text
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
  }, [content.text, handleBlur]);

  // Focus editor when entering edit mode
  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditing]);

  // Handle paste to strip formatting
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  const style: React.CSSProperties = {
    backgroundColor: content.backgroundColor || '#fff9c4',
    color: content.color || '#000000',
  };

  return (
    <BaseNodeWrapper
      node={node}
      selected={selected}
      onSelect={onSelect}
      onResize={onResize}
      onMove={onMove}
    >
      <div
        className={styles.textNode}
        style={style}
        onDoubleClick={handleDoubleClick}
      >
        <div
          ref={editorRef}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          style={{
            width: '100%',
            height: '100%',
            outline: 'none',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            cursor: isEditing ? 'text' : 'default',
          }}
          onInput={(e) => setText(e.currentTarget.textContent || '')}
        >
          {text}
        </div>
      </div>
    </BaseNodeWrapper>
  );
};

// Node registration
export const textNodeConfig = {
  type: 'text' as const,
  component: TextNode,
  defaultDimensions: { width: 200, height: 150 },
  canResize: true,
  canRotate: false,
  create: (text: string = 'New note') => ({
    content: {
      text,
      backgroundColor: '#fff9c4',
      color: '#000000',
    } as TextContent,
  }),
};