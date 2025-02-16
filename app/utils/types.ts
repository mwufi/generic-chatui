export interface Vector2D {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Transform {
  scale: number;
  rotation: number;
}

export interface Bounds {
  min: Vector2D;
  max: Vector2D;
}

export type NodeType = 'iframe' | 'image' | 'text' | 'prompt' | 'file';

export interface BaseNode {
  id: string;
  position: Vector2D;
  dimensions: Dimensions;
  type: NodeType;
  zIndex: number;
  transform: Transform;
  content: any;
}

export type SelectionMode = 'none' | 'rectangle' | 'direct';

export interface ViewportState {
  scale: number;
  offset: Vector2D;
  dimensions: Dimensions;
}