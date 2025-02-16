import { Vector2D, ViewportState, Bounds } from './types';

export class ViewportManager {
  private state: ViewportState;
  private stateChangeHandler: (state: ViewportState) => void;

  constructor(initialState: ViewportState, onStateChange: (state: ViewportState) => void) {
    this.state = initialState;
    this.stateChangeHandler = onStateChange;
  }

  private updateState(newState: ViewportState) {
    this.state = newState;
    this.stateChangeHandler(this.state);
  }

  updatePan(delta: Vector2D): void {
    this.updateState({
      ...this.state,
      offset: {
        x: this.state.offset.x + delta.x,
        y: this.state.offset.y + delta.y
      }
    });
  }

  updateZoom(scale: number, center: Vector2D): void {
    const prevScale = this.state.scale;
    const newScale = Math.max(0.1, Math.min(5, scale));
    
    // Adjust offset to zoom towards mouse position
    const offsetX = center.x - (center.x - this.state.offset.x) * (newScale / prevScale);
    const offsetY = center.y - (center.y - this.state.offset.y) * (newScale / prevScale);

    this.updateState({
      ...this.state,
      scale: newScale,
      offset: { x: offsetX, y: offsetY }
    });
  }

  fitToView(bounds: Bounds): void {
    const contentWidth = bounds.max.x - bounds.min.x;
    const contentHeight = bounds.max.y - bounds.min.y;
    
    const scaleX = this.state.dimensions.width / contentWidth;
    const scaleY = this.state.dimensions.height / contentHeight;
    const scale = Math.min(scaleX, scaleY) * 0.9; // 90% to add some padding
    
    this.updateState({
      ...this.state,
      scale,
      offset: {
        x: -bounds.min.x * scale + (this.state.dimensions.width - contentWidth * scale) / 2,
        y: -bounds.min.y * scale + (this.state.dimensions.height - contentHeight * scale) / 2
      }
    });
  }

  getState(): ViewportState {
    return this.state;
  }

  setState(newState: ViewportState): void {
    this.updateState(newState);
  }

  // Convert screen coordinates to canvas coordinates
  screenToCanvas(point: Vector2D): Vector2D {
    return {
      x: (point.x - this.state.offset.x) / this.state.scale,
      y: (point.y - this.state.offset.y) / this.state.scale
    };
  }

  // Convert canvas coordinates to screen coordinates
  canvasToScreen(point: Vector2D): Vector2D {
    return {
      x: point.x * this.state.scale + this.state.offset.x,
      y: point.y * this.state.scale + this.state.offset.y
    };
  }
}