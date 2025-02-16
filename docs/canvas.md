# Canvas Technical Architecture

## Overview
An infinite canvas implementation supporting various interactive nodes with a focus on extensibility and performance.

## Node System Architecture

### Base Node Interface
```typescript
interface BaseNode {
  id: string;
  position: Vector2D;
  dimensions: Dimensions;
  type: NodeType;
  selected: boolean;
  zIndex: number;
  transform: Transform; // scale, rotation
  onSelect?: () => void;
  onDeselect?: () => void;
}
```

### Node Types
1. **IFrameNode**
   - Extends BaseNode
   - Handles iframe sandbox permissions
   - Interaction states:
     * Unselected: Click-through disabled, shows overlay
     * Selected: Full interaction enabled
     * Fullscreen: Maximum viewport usage
   - Custom event bubbling control
   - Viewport-aware rendering optimization

2. **ImageNode**
   - Extends BaseNode
   - Supports direct file drops
   - Clipboard paste handling
   - Image optimization pipeline
   - Lazy loading for off-viewport images

3. **TextNode (Sticky Notes)**
   - Extends BaseNode
   - Rich text editor integration
   - Auto-resize capability
   - Custom selection handling
   - Markdown parsing/rendering

4. **PromptNode**
   - Extends BaseNode
   - State management for edit/view modes
   - Fullscreen mode handler
   - Auto-save integration
   - Custom keyboard shortcuts

5. **FileNode**
   - Extends BaseNode
   - Preview generation system
   - File type detection
   - Thumbnail rendering
   - Download handler

### Node Registry System
```typescript
interface NodeRegistry {
  registerNode: (type: string, component: React.Component) => void;
  getNode: (type: string) => React.Component;
  // Allows for runtime node type registration
}
```

## Selection System

### Selection Modes
1. **Rectangle Selection**
   - Implementation: HTML5 Canvas overlay
   - Selection box rendering
   - Intersection detection using quadtree for performance
   - Visual feedback during selection

2. **Direct Selection**
   - Click to select single node
   - Shift+Click to add/remove from selection
   - Ctrl/Cmd+Click for multiple selection
   - Selection outline rendering

3. **Selection Manager**
```typescript
interface SelectionManager {
  selectedNodes: Set<string>;
  selectionMode: SelectionMode;
  startSelection: (point: Vector2D) => void;
  updateSelection: (point: Vector2D) => void;
  endSelection: () => void;
  addToSelection: (nodeId: string) => void;
  removeFromSelection: (nodeId: string) => void;
}
```

## Event Handling

### Event Management System
1. **Global Events**
   - Space + Drag for panning
   - Zoom controls (wheel, pinch)
   - Keyboard shortcuts
   - Clipboard events

2. **Node-Specific Events**
   - Mouse interaction handling
   - Touch events
   - Drag operations
   - Resize operations

3. **IFrame Event Control**
```typescript
interface IFrameController {
  enableInteraction: () => void;
  disableInteraction: () => void;
  handleSelection: (selected: boolean) => void;
  // Manages overlay and interaction states
}
```

## Navigation Implementation

### Pan and Zoom
1. **Pan Implementation**
   - Space + Drag activation
   - Inertial panning
   - Edge detection
   - Performance optimization using requestAnimationFrame

2. **Zoom Implementation**
   - Wheel zoom
   - Pinch zoom on touch devices
   - Zoom to fit functionality
   - Smooth zoom transitions

3. **Viewport Manager**
```typescript
interface ViewportManager {
  scale: number;
  offset: Vector2D;
  updatePan: (delta: Vector2D) => void;
  updateZoom: (scale: number, center: Vector2D) => void;
  fitToView: (bounds: Bounds) => void;
}
```

## Technical Stack Decision

### Rendering Layer: React + HTML + CSS Transform
Rationale:
- DOM-based rendering for better accessibility
- CSS transforms for hardware acceleration
- React for component management and state
- HTML5 Canvas overlay for selection and drawing tools

Benefits:
1. Better text handling and accessibility
2. Native browser optimizations
3. Simpler debugging and development
4. Better iframe integration

Drawbacks:
1. Potential performance limitations with many nodes
2. More complex animation handling

### Performance Optimizations:
1. Viewport culling for off-screen nodes
2. Quadtree for spatial queries
3. Virtual DOM optimization
4. CSS containment for isolation
5. Web Workers for heavy computations

### State Management:
1. React Context for global state
2. Zustand for lightweight state management
3. Custom event system for node communication

## Implementation Strategy

### Phase 1: Core Infrastructure
1. Basic canvas with pan/zoom
2. Node registry system
3. Selection management
4. Event handling system

### Phase 2: Node Implementation
1. Basic node types (Text, Image)
2. Selection system
3. Drag and drop support

### Phase 3: Advanced Features
1. IFrame node implementation
2. File handling
3. PromptNode implementation
4. Performance optimizations