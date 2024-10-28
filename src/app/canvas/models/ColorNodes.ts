import {
  CustomProperty,
  FeatureCardVM,
} from "@/lib/features/canvas/models/CanvasVM";
import { Node, NodeProps } from "@xyflow/react";

/**
 * The data inherited to the node
 */
//#region Data Types of Nodes
export type ColorNodeData = {
  id: string;
  label: string;
  description: string;
  section: string;
  time: number;
  dependencies: string[];
  customProperties: CustomProperty[];
  color?: string;
};
export type DependencyNodeData = {
  parents: string[];
  children: string[];
  color: string;
};

//#endregion

/**
 * The explicit type of the node
 */

//#region Node Types
export type ColorNodeType = Node<ColorNodeData, "colorNode">;
export type DependencyNodeType = Node<DependencyNodeData, "dependency">;
//#endregion

//type ColorNode = Node<{ color: string }, "color">;
