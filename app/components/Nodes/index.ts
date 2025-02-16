import { nodeRegistry } from '@/app/utils/nodeRegistry';
import { iframeNodeConfig, IFrameNodeProps, IFrameContent } from './IFrameNode';
import { textNodeConfig, TextNodeProps, TextContent } from './TextNode';
import { imageNodeConfig, ImageNodeProps, ImageContent } from './ImageNode';
import { fileNodeConfig, FileNodeProps, FileContent } from './FileNode';
import { promptNodeConfig, PromptNodeProps, PromptContent } from './PromptNode';
import { NodeType } from '@/app/utils/types';

// Register all node types
nodeRegistry.registerNode(
  'iframe' as NodeType,
  iframeNodeConfig.component,
  {
    defaultDimensions: iframeNodeConfig.defaultDimensions,
    canResize: iframeNodeConfig.canResize,
    canRotate: iframeNodeConfig.canRotate,
  }
);

nodeRegistry.registerNode(
  'text' as NodeType,
  textNodeConfig.component,
  {
    defaultDimensions: textNodeConfig.defaultDimensions,
    canResize: textNodeConfig.canResize,
    canRotate: textNodeConfig.canRotate,
  }
);

nodeRegistry.registerNode(
  'image' as NodeType,
  imageNodeConfig.component,
  {
    defaultDimensions: imageNodeConfig.defaultDimensions,
    canResize: imageNodeConfig.canResize,
    canRotate: imageNodeConfig.canRotate,
  }
);

nodeRegistry.registerNode(
  'file' as NodeType,
  fileNodeConfig.component,
  {
    defaultDimensions: fileNodeConfig.defaultDimensions,
    canResize: fileNodeConfig.canResize,
    canRotate: fileNodeConfig.canRotate,
  }
);

nodeRegistry.registerNode(
  'prompt' as NodeType,
  promptNodeConfig.component,
  {
    defaultDimensions: promptNodeConfig.defaultDimensions,
    canResize: promptNodeConfig.canResize,
    canRotate: promptNodeConfig.canRotate,
  }
);

// Export node configs
export {
  iframeNodeConfig,
  textNodeConfig,
  imageNodeConfig,
  fileNodeConfig,
  promptNodeConfig,
};

// Export types
export type {
  IFrameNodeProps,
  IFrameContent,
  TextNodeProps,
  TextContent,
  ImageNodeProps,
  ImageContent,
  FileNodeProps,
  FileContent,
  PromptNodeProps,
  PromptContent,
};

// Export node creation helpers with proper typing
export const createNode = {
  iframe: (url: string) => nodeRegistry.createNode<IFrameContent>(
    'iframe',
    { url, sandboxPermissions: ['allow-same-origin', 'allow-scripts'] }
  ),
  text: (text?: string) => nodeRegistry.createNode<TextContent>(
    'text',
    { text: text || 'New note', backgroundColor: '#fff9c4' }
  ),
  image: (data: { url: string; dimensions?: { width: number; height: number } }) =>
    nodeRegistry.createNode<ImageContent>(
      'image',
      {
        url: data.url,
        originalWidth: data.dimensions?.width || 300,
        originalHeight: data.dimensions?.height || 200,
      }
    ),
  file: (data: FileContent) => nodeRegistry.createNode<FileContent>(
    'file',
    data
  ),
  prompt: (title?: string) => nodeRegistry.createNode<PromptContent>(
    'prompt',
    {
      title: title || 'New Prompt',
      content: '',
      tags: [],
      lastEdited: new Date().toISOString(),
    }
  ),
};