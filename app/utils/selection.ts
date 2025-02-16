import { Vector2D, BaseNode, SelectionMode } from './types';

interface SelectionBox {
  start: Vector2D;
  end: Vector2D;
}

export class SelectionManager {
  private selectedNodes: Set<string>;
  private selectionMode: SelectionMode;
  private selectionBox: SelectionBox | null;
  private selectionChangeHandler: (selectedIds: string[]) => void;

  constructor(onSelectionChange: (selectedIds: string[]) => void) {
    this.selectedNodes = new Set();
    this.selectionMode = 'none';
    this.selectionBox = null;
    this.selectionChangeHandler = onSelectionChange;
  }

  startSelection(point: Vector2D, mode: SelectionMode = 'rectangle'): void {
    this.selectionMode = mode;
    if (mode === 'rectangle') {
      this.selectionBox = { start: point, end: point };
    }
  }

  updateSelection(point: Vector2D, nodes: BaseNode[]): void {
    if (this.selectionMode === 'rectangle' && this.selectionBox) {
      this.selectionBox.end = point;
      
      // Calculate selection box bounds in canvas coordinates
      const minX = Math.min(this.selectionBox.start.x, this.selectionBox.end.x);
      const maxX = Math.max(this.selectionBox.start.x, this.selectionBox.end.x);
      const minY = Math.min(this.selectionBox.start.y, this.selectionBox.end.y);
      const maxY = Math.max(this.selectionBox.start.y, this.selectionBox.end.y);

      // Clear previous selection
      this.selectedNodes.clear();

      // Check which nodes intersect with selection box
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
  }

  endSelection(): void {
    this.selectionBox = null;
    this.selectionMode = 'none';
  }

  toggleNodeSelection(nodeId: string, additive: boolean = false): void {
    console.log('Selection toggle:', {
      nodeId,
      additive,
      previousSelection: Array.from(this.selectedNodes)
    });

    if (!additive) {
      console.log('Clearing selection (non-additive mode)');
      this.selectedNodes.clear();
    }

    if (this.selectedNodes.has(nodeId)) {
      console.log(`Removing node ${nodeId} from selection`);
      this.selectedNodes.delete(nodeId);
    } else {
      console.log(`Adding node ${nodeId} to selection`);
      this.selectedNodes.add(nodeId);
    }

    const newSelection = Array.from(this.selectedNodes);
    console.log('New selection state:', newSelection);
    this.notifySelectionChange();
  }

  clearSelection(): void {
    if (this.selectedNodes.size > 0) {
      this.selectedNodes.clear();
      this.notifySelectionChange();
    }
  }

  isSelected(nodeId: string): boolean {
    return this.selectedNodes.has(nodeId);
  }

  getSelectedNodes(): string[] {
    return Array.from(this.selectedNodes);
  }

  getSelectionBox(): SelectionBox | null {
    return this.selectionBox;
  }

  private notifySelectionChange(): void {
    this.selectionChangeHandler(Array.from(this.selectedNodes));
  }
}