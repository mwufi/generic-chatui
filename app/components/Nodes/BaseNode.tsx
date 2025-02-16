'use client';

import React, { useCallback, useState } from 'react';
import styles from '../Canvas/Canvas.module.css';
import { BaseNode as BaseNodeType } from '@/app/utils/types';

interface ResizeHandle {
  cursor: string;
  position: { top?: string; right?: string; bottom?: string; left?: string };
}

const RESIZE_HANDLES: Record<string, ResizeHandle> = {
  nw: { cursor: 'nw-resize', position: { top: '-4px', left: '-4px' } },
  n:  { cursor: 'n-resize',  position: { top: '-4px', left: '50%' } },
  ne: { cursor: 'ne-resize', position: { top: '-4px', right: '-4px' } },
  e:  { cursor: 'e-resize',  position: { top: '50%', right: '-4px' } },
  se: { cursor: 'se-resize', position: { bottom: '-4px', right: '-4px' } },
  s:  { cursor: 's-resize',  position: { bottom: '-4px', left: '50%' } },
  sw: { cursor: 'sw-resize', position: { bottom: '-4px', left: '-4px' } },
  w:  { cursor: 'w-resize',  position: { top: '50%', left: '-4px' } },
};

interface BaseNodeProps {
  node: BaseNodeType;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onResize?: (width: number, height: number) => void;
  onMove?: (x: number, y: number) => void;
  children: React.ReactNode;
  canResize?: boolean;
  isFullscreen?: boolean;
}

export const BaseNodeWrapper: React.FC<BaseNodeProps> = ({
  node,
  selected,
  onSelect,
  onResize,
  onMove,
  children,
  canResize = true,
  isFullscreen = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startDimensions, setStartDimensions] = useState({ width: 0, height: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    console.log('Node mouse down:', {
      nodeId: node.id,
      type: node.type,
      selected,
      position: node.position,
      dimensions: node.dimensions,
      event: {
        clientX: e.clientX,
        clientY: e.clientY,
        shiftKey: e.shiftKey
      }
    });
    
    if (!selected) {
      console.log(`Selecting node ${node.id}`);
      onSelect(e);
    }

    setIsDragging(true);
    setStartPos({
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y
    });
  }, [selected, onSelect, node.position]);

  const handleResizeStart = useCallback((e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartDimensions({
      width: node.dimensions.width,
      height: node.dimensions.height
    });
  }, [node.dimensions]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && onMove) {
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;
      console.log('Node dragging:', {
        nodeId: node.id,
        startPos,
        mousePos: { x: e.clientX, y: e.clientY },
        newPos: { x: newX, y: newY }
      });
      onMove(newX, newY);
    } else if (isResizing && resizeHandle && onResize) {
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      
      let newWidth = startDimensions.width;
      let newHeight = startDimensions.height;

      if (resizeHandle.includes('e')) newWidth += deltaX;
      if (resizeHandle.includes('w')) newWidth -= deltaX;
      if (resizeHandle.includes('s')) newHeight += deltaY;
      if (resizeHandle.includes('n')) newHeight -= deltaY;

      onResize(
        Math.max(100, newWidth),
        Math.max(50, newHeight)
      );
    }
  }, [isDragging, isResizing, resizeHandle, startPos, startDimensions, onMove, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  }, []);

  React.useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const nodeStyle: React.CSSProperties = isFullscreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
  } : {
    position: 'absolute',
    left: `${node.position.x}px`,
    top: `${node.position.y}px`,
    width: `${node.dimensions.width}px`,
    height: `${node.dimensions.height}px`,
    transform: `scale(${node.transform.scale}) rotate(${node.transform.rotation}deg)`,
    zIndex: node.zIndex,
  };

  return (
    <div
      className={`${styles.node} ${selected ? styles.selected : ''} ${isDragging ? styles.dragging : ''} ${isFullscreen ? styles.fullscreen : ''}`}
      style={nodeStyle}
      onMouseDown={handleMouseDown}
    >
      {children}
      
      {selected && canResize && !isFullscreen && Object.entries(RESIZE_HANDLES).map(([handle, config]) => (
        <div
          key={handle}
          className={`${styles.resizeHandle} ${styles[handle]}`}
          style={{
            cursor: config.cursor,
            ...config.position,
          }}
          onMouseDown={(e) => handleResizeStart(e, handle)}
        />
      ))}
    </div>
  );
};