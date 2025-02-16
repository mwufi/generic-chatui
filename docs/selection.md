# Selection Implementation Analysis

## Current Implementation

### Components Involved
1. SelectionManager (app/utils/selection.ts)
   - Manages selection state using a Set of node IDs
   - Handles rectangle selection box state
   - Provides selection change notifications

2. Canvas (app/components/Canvas/Canvas.tsx)
   - Manages mouse events and viewport
   - Initializes SelectionManager
   - Passes selection state to nodes
   - Handles selection box rendering

3. BaseNodeWrapper (app/components/Nodes/BaseNode.tsx)
   - Handles node-level mouse interactions
   - Manages dragging state
   - Triggers selection changes

### Current Flow Issues

1. Selection and Dragging Confusion
   - BaseNodeWrapper mixes selection and drag initiation
   - Canvas doesn't clearly distinguish between selection and drag modes
   - No clear separation between clicking for selection vs. dragging

2. Unclear Selection Rules
   - Node clicks don't properly replace selection
   - Canvas clicks don't clear selection
   - Rectangle selection doesn't follow standard UX patterns

3. Complex State Management
   - Selection state split between multiple components
   - Dragging state managed separately from selection
   - No clear ownership of interaction modes

## Proposed Abstractions

### 1. Interaction Mode Manager
```typescript
type InteractionMode = 'select' | 'drag' | 'rectangleSelect' | 'none';

class InteractionManager {
  mode: InteractionMode;
  
  startInteraction(e: MouseEvent): void;
  updateInteraction(e: MouseEvent): void;
  endInteraction(): void;
}
```

### 2. Clear Selection Rules
```typescript
class SelectionManager {
  // Replace selection with single node
  select(nodeId: string): void;
  
  // Add/remove from current selection
  toggleSelection(nodeId: string): void;
  
  // Clear all selection
  clearSelection(): void;
  
  // Start rectangle selection
  beginRectangleSelection(point: Vector2D): void;
  
  // Update rectangle and contained nodes
  updateRectangleSelection(point: Vector2D): void;
}
```

### 3. Separation of Concerns

#### Canvas Level
- Handles global mouse events
- Manages interaction modes
- Delegates to appropriate manager

```typescript
class Canvas {
  onMouseDown(e: MouseEvent) {
    if (hitNode) {
      if (e.shiftKey) {
        selectionManager.toggleSelection(hitNode.id);
      } else {
        selectionManager.select(hitNode.id);
      }
      if (e.button === 0) { // Left click
        interactionManager.startDrag(hitNode);
      }
    } else {
      selectionManager.clearSelection();
      if (e.button === 0) { // Left click
        selectionManager.beginRectangleSelection(point);
      }
    }
  }
}
```

#### Node Level
- Only handles node-specific interactions
- Reports events up to Canvas
- No direct selection management

```typescript
class NodeWrapper {
  onMouseDown(e: MouseEvent) {
    e.stopPropagation();
    this.props.onNodeInteraction({
      type: 'mouseDown',
      nodeId: this.props.node.id,
      event: e
    });
  }
}
```

## Benefits of New Approach

1. Clear Interaction States
   - One source of truth for current interaction mode
   - Clear transitions between modes
   - Predictable behavior

2. Simplified Selection Logic
   - Standard selection patterns (click, shift+click, rectangle)
   - Clear rules for selection changes
   - Centralized selection management

3. Better Separation of Concerns
   - Canvas manages global state and mode
   - Nodes only report interactions
   - Clear data flow and responsibility

4. Improved Maintainability
   - Each manager has a single responsibility
   - Easy to modify individual behaviors
   - Clear interfaces between components

## Implementation Steps

1. Create InteractionManager
2. Refactor SelectionManager to new interface
3. Update Canvas to use both managers
4. Simplify NodeWrapper to only report events
5. Add proper selection box rendering
6. Implement standard selection patterns

This approach would make the selection and dragging behavior more intuitive and maintainable, following standard UX patterns that users expect.