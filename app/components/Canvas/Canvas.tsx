'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ViewportManager } from '@/app/utils/viewport';
import { SelectionManager } from '@/app/utils/selection';
import { InteractionManager } from '@/app/utils/interaction';
import { BaseNode, Vector2D, ViewportState } from '@/app/utils/types';
import { nodeRegistry } from '@/app/utils/nodeRegistry';
import { Toolbar } from './Toolbar';
import styles from './Canvas.module.css';

interface CanvasProps {
  nodes: BaseNode[];
  onNodesChange?: (nodes: BaseNode[]) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ nodes, onNodesChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<ViewportManager | null>(null);
  const selectionRef = useRef<SelectionManager | null>(null);
  const interactionRef = useRef<InteractionManager | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [spacePressed, setSpacePressed] = useState(false);
  const lastMousePos = useRef<Vector2D | null>(null);

  // Initialize managers
  useEffect(() => {
    if (!containerRef.current || viewportRef.current) return;

    // Wait for the container to be mounted and have dimensions
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const initialViewport: ViewportState = {
      scale: 1,
      offset: { x: 0, y: 0 },
      dimensions: {
        width: rect.width,
        height: rect.height
      }
    };

    viewportRef.current = new ViewportManager(
      initialViewport,
      () => {
        const viewport = viewportRef.current?.getState();
        console.log('Viewport updated:', {
          scale: viewport?.scale,
          offset: viewport?.offset,
          dimensions: viewport?.dimensions
        });
        // Force re-render when viewport changes
        setIsInitialized(prev => prev);
      }
    );

    selectionRef.current = new SelectionManager(
      (selectedIds) => {
        console.log('Selection change in Canvas:', {
          selectedIds,
          currentNodes: nodes.map(n => ({ id: n.id, type: n.type }))
        });
      }
    );

    interactionRef.current = new InteractionManager(
      () => {
        // Force re-render when interaction state changes
        setIsInitialized(prev => prev);
      }
    );

    setIsInitialized(true);
  }, [nodes]);

  // Update viewport dimensions on resize
  useEffect(() => {
    if (!containerRef.current || !viewportRef.current) return;

    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const currentState = viewportRef.current!.getState();
      viewportRef.current!.setState({
        ...currentState,
        dimensions: {
          width: rect.width,
          height: rect.height
        }
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !spacePressed) {
        setSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setSpacePressed(false);
        setIsPanning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [spacePressed]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!viewportRef.current || !selectionRef.current || !interactionRef.current) return;

    const point = { x: e.clientX, y: e.clientY };
    const canvasPoint = viewportRef.current.screenToCanvas(point);
    lastMousePos.current = point;

    if (spacePressed) {
      setIsPanning(true);
    } else {
      // Clear selection when clicking empty canvas
      if (e.target === e.currentTarget) {
        selectionRef.current.clearSelection();
        if (e.button === 0) { // Left click
          interactionRef.current.startInteraction(canvasPoint, 'rectangleSelect');
          selectionRef.current.beginRectangleSelection(canvasPoint);
        }
      }
    }
  }, [spacePressed]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!viewportRef.current || !lastMousePos.current || !interactionRef.current) return;

    const point = { x: e.clientX, y: e.clientY };
    const canvasPoint = viewportRef.current.screenToCanvas(point);
    const delta = {
      x: point.x - lastMousePos.current.x,
      y: point.y - lastMousePos.current.y
    };

    if (isPanning) {
      viewportRef.current.updatePan(delta);
    } else {
      const state = interactionRef.current.getState();
      if (state.mode === 'rectangleSelect' && selectionRef.current) {
        selectionRef.current.updateRectangleSelection(canvasPoint, nodes);
      } else if (state.mode === 'drag' && state.targetNodeId) {
        // Handle node dragging
        const node = nodes.find(n => n.id === state.targetNodeId);
        if (node && onNodesChange) {
          const updatedNodes = nodes.map(n =>
            n.id === state.targetNodeId
              ? { ...n, position: canvasPoint }
              : n
          );
          onNodesChange(updatedNodes);
        }
      }
    }

    lastMousePos.current = point;
  }, [nodes, isPanning, onNodesChange]);

  const handleMouseUp = useCallback(() => {
    if (!interactionRef.current || !selectionRef.current) return;

    const state = interactionRef.current.getState();
    if (state.mode === 'rectangleSelect') {
      selectionRef.current.endRectangleSelection();
    }

    interactionRef.current.endInteraction();
    setIsPanning(false);
    lastMousePos.current = null;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!viewportRef.current) return;

    const point = { x: e.clientX, y: e.clientY };
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    viewportRef.current.updateZoom(
      viewportRef.current.getState().scale * delta,
      point
    );
  }, []);

  // Toolbar handlers
  const handleAddNode = useCallback((node: BaseNode) => {
    if (onNodesChange) {
      onNodesChange([...nodes, node]);
    }
  }, [nodes, onNodesChange]);

  const handleZoomIn = useCallback(() => {
    if (!viewportRef.current || !containerRef.current) return;
    const center = {
      x: containerRef.current.clientWidth / 2,
      y: containerRef.current.clientHeight / 2,
    };
    viewportRef.current.updateZoom(viewportRef.current.getState().scale * 1.2, center);
  }, []);

  const handleZoomOut = useCallback(() => {
    if (!viewportRef.current || !containerRef.current) return;
    const center = {
      x: containerRef.current.clientWidth / 2,
      y: containerRef.current.clientHeight / 2,
    };
    viewportRef.current.updateZoom(viewportRef.current.getState().scale * 0.8, center);
  }, []);

  const handleResetView = useCallback(() => {
    if (!viewportRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    viewportRef.current.setState({
      scale: 1,
      offset: { x: 0, y: 0 },
      dimensions: {
        width: rect.width,
        height: rect.height,
      },
    });
  }, []);

  if (!isInitialized || !viewportRef.current || !selectionRef.current) {
    return (
      <div ref={containerRef} className={styles.canvas}>
        <div>Initializing canvas...</div>
      </div>
    );
  }

  const viewportState = viewportRef.current.getState();
  const transform = `translate(${viewportState.offset.x}px, ${viewportState.offset.y}px) scale(${viewportState.scale})`;

  return (
    <div
      ref={containerRef}
      className={styles.canvas}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <Toolbar
        onAddNode={handleAddNode}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
      />
      <div className={styles.transformLayer} style={{ transform }}>
        {nodes.map(node => {
          const NodeComponent = nodeRegistry.getComponent(node.type);
          if (!NodeComponent) return null;

          return (
            <NodeComponent
              key={node.id}
              node={node}
              selected={selectionRef.current!.isSelected(node.id)}
              onSelect={(e: React.MouseEvent) => {
                if (!selectionRef.current || !interactionRef.current || !viewportRef.current) return;
                
                const isSelected = selectionRef.current.isSelected(node.id);
                
                // Handle selection only if not already selected (unless shift is pressed)
                if (!isSelected || e.shiftKey) {
                  if (e.shiftKey) {
                    selectionRef.current.toggleSelection(node.id);
                  } else {
                    selectionRef.current.select(node.id);
                  }
                }

                // Always start drag on left click, whether selected or not
                if (e.button === 0) {
                  const canvasPoint = viewportRef.current.screenToCanvas({ x: e.clientX, y: e.clientY });
                  interactionRef.current.startInteraction(canvasPoint, 'drag', node.id);
                }
              }}
              onMove={(x: number, y: number) => {
                console.log('Node move:', {
                  nodeId: node.id,
                  from: node.position,
                  to: { x, y }
                });
                if (onNodesChange) {
                  const updatedNodes = nodes.map(n =>
                    n.id === node.id
                      ? { ...n, position: { x, y } }
                      : n
                  );
                  onNodesChange(updatedNodes);
                }
              }}
            />
          );
        })}
      </div>
      {/* Selection overlay */}
      {interactionRef.current?.getState().mode === 'rectangleSelect' && selectionRef.current?.getSelectionBox() && (
        <div
          className={styles.selectionBox}
          style={{
            position: 'absolute',
            left: Math.min(selectionRef.current.getSelectionBox()!.start.x, selectionRef.current.getSelectionBox()!.end.x) * viewportState.scale + viewportState.offset.x,
            top: Math.min(selectionRef.current.getSelectionBox()!.start.y, selectionRef.current.getSelectionBox()!.end.y) * viewportState.scale + viewportState.offset.y,
            width: Math.abs(selectionRef.current.getSelectionBox()!.end.x - selectionRef.current.getSelectionBox()!.start.x) * viewportState.scale,
            height: Math.abs(selectionRef.current.getSelectionBox()!.end.y - selectionRef.current.getSelectionBox()!.start.y) * viewportState.scale,
            border: '2px solid #0066ff',
            background: 'rgba(0, 102, 255, 0.1)',
            pointerEvents: 'none',
            zIndex: 1000
          }}
        />
      )}
    </div>
  );
};