import { Vector2D } from './types';

export type InteractionMode = 'select' | 'drag' | 'rectangleSelect' | 'none';

interface InteractionState {
  mode: InteractionMode;
  startPoint: Vector2D | null;
  currentPoint: Vector2D | null;
  targetNodeId: string | null;
}

export class InteractionManager {
  private state: InteractionState;
  private onStateChange: () => void;

  constructor(onChange: () => void) {
    this.state = {
      mode: 'none',
      startPoint: null,
      currentPoint: null,
      targetNodeId: null
    };
    this.onStateChange = onChange;
  }

  startInteraction(point: Vector2D, mode: InteractionMode, nodeId?: string) {
    console.log('Starting interaction:', { point, mode, nodeId });
    
    this.state = {
      mode,
      startPoint: point,
      currentPoint: point,
      targetNodeId: nodeId || null
    };
    
    this.onStateChange();
  }

  updateInteraction(point: Vector2D) {
    if (this.state.mode === 'none') return;

    console.log('Updating interaction:', {
      mode: this.state.mode,
      from: this.state.currentPoint,
      to: point
    });

    this.state.currentPoint = point;
    this.onStateChange();
  }

  endInteraction() {
    console.log('Ending interaction:', this.state);
    
    this.state = {
      mode: 'none',
      startPoint: null,
      currentPoint: null,
      targetNodeId: null
    };
    
    this.onStateChange();
  }

  getState(): InteractionState {
    return { ...this.state };
  }

  isDragging(): boolean {
    return this.state.mode === 'drag';
  }

  isRectangleSelecting(): boolean {
    return this.state.mode === 'rectangleSelect';
  }
}