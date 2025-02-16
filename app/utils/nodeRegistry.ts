import { NodeType, BaseNode } from './types';
import { ComponentType } from 'react';

interface NodeDefinition {
  component: ComponentType<any>;
  defaultDimensions: { width: number; height: number };
  canResize: boolean;
  canRotate: boolean;
}

class NodeRegistry {
  private static instance: NodeRegistry;
  private nodeTypes: Map<NodeType, NodeDefinition>;
  private nextZIndex: number = 1;

  private constructor() {
    this.nodeTypes = new Map();
  }

  static getInstance(): NodeRegistry {
    if (!NodeRegistry.instance) {
      NodeRegistry.instance = new NodeRegistry();
    }
    return NodeRegistry.instance;
  }

  registerNode(
    type: NodeType,
    component: ComponentType<any>,
    options: Partial<Omit<NodeDefinition, 'component'>> = {}
  ): void {
    const defaultOptions = {
      defaultDimensions: { width: 200, height: 150 },
      canResize: true,
      canRotate: false,
    };

    this.nodeTypes.set(type, {
      component,
      ...defaultOptions,
      ...options,
    });
  }

  getNodeDefinition(type: NodeType): NodeDefinition | undefined {
    return this.nodeTypes.get(type);
  }

  getComponent(type: NodeType): ComponentType<any> | undefined {
    return this.nodeTypes.get(type)?.component;
  }

  getDefaultDimensions(type: NodeType): { width: number; height: number } {
    return (
      this.nodeTypes.get(type)?.defaultDimensions || 
      { width: 200, height: 150 }
    );
  }

  isResizable(type: NodeType): boolean {
    return this.nodeTypes.get(type)?.canResize ?? true;
  }

  canRotate(type: NodeType): boolean {
    return this.nodeTypes.get(type)?.canRotate ?? false;
  }

  getRegisteredTypes(): NodeType[] {
    return Array.from(this.nodeTypes.keys());
  }

  createNode<T>(
    type: NodeType,
    content: T,
    position: { x: number; y: number } = { x: 0, y: 0 }
  ): BaseNode {
    const definition = this.getNodeDefinition(type);
    if (!definition) {
      throw new Error(`Node type "${type}" is not registered`);
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      position,
      dimensions: definition.defaultDimensions,
      zIndex: this.nextZIndex++,
      transform: { scale: 1, rotation: 0 },
      content,
    };
  }
}

// Export singleton instance
export const nodeRegistry = NodeRegistry.getInstance();