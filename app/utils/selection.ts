import { Vector2D, BaseNode } from './types';

export class SelectionManager {
  private selectedNodes: Set<string>;
  private selectionBox: { start: Vector2D; end: Vector2D } | null;
  private selectionChangeHandler: (selectedIds: string[]) => void;

  constructor(onSelectionChange: (selectedIds: string[]) => void) {
    this.selectedNodes = new Set();
    this.selectionBox = null;
    this.selectionChangeHandler = onSelectionChange;
  }

  // Replace current selection with single node
  select(nodeId: string): void {
    console.log('Selecting single node:', nodeId);
    this.selectedNodes.clear();
    this.selectedNodes.add(nodeId);
    this.notifySelectionChange();
  }

  // Add/remove from current selection
  toggleSelection(nodeId: string): void {
    console.log('Toggling node selection:', nodeId);
    if (this.selectedNodes.has(nodeId)) {
      this.selectedNodes.delete(nodeId);
    } else {
      this.selectedNodes.add(nodeId);
    }
    this.notifySelectionChange();
  }

  // Clear all selection
  clearSelection(): void {
    console.log('Clearing selection');
    if (this.selectedNodes.size > 0) {
      this.selectedNodes.clear();
      this.notifySelectionChange();
    }
  }

  // Start rectangle selection
  beginRectangleSelection(point: Vector2D): void {
    console.log('Beginning rectangle selection at:', point);
    this.selectionBox = { start: point, end: point };
  }

  // Update rectangle selection
  updateRectangleSelection(point: Vector2D, nodes: BaseNode[]): void {
    if (!this.selectionBox) return;

    console.log('Updating rectangle selection to:', point);
    this.selectionBox.end = point;

    // Calculate selection box bounds
    const minX = Math.min(this.selectionBox.start.x, this.selectionBox.end.x);
    const maxX = Math.max(this.selectionBox.start.x, this.selectionBox.end.x);
    const minY = Math.min(this.selectionBox.start.y, this.selectionBox.end.y);
    const maxY = Math.max(this.selectionBox.start.y, this.selectionBox.end.y);

    // Clear and recompute selection based on intersection
    this.selectedNodes.clear();
    nodes.forEach(node => {
      const nodeRight = node.position.x + node.dimensions.width;
      const nodeBottom = node.position.y + node.dimensions.height;

      if (
        node.position.x <= maxX &&
        nodeRight >= minX &&
        node.position.y <= maxY &&
        nodeBottom >= minY
      ) {
        this.selectedNodes.add(node.id);
      }
    });

    this.notifySelectionChange();
  }

  // End rectangle selection
  endRectangleSelection(): void {
    console.log('Ending rectangle selection');
    this.selectionBox = null;
  }

  // Query methods
  isSelected(nodeId: string): boolean {
    return this.selectedNodes.has(nodeId);
  }

  getSelectedNodes(): string[] {
    return Array.from(this.selectedNodes);
  }

  getSelectionBox(): { start: Vector2D; end: Vector2D } | null {
    return this.selectionBox;
  }

  private notifySelectionChange(): void {
    this.selectionChangeHandler(Array.from(this.selectedNodes));
  }
}