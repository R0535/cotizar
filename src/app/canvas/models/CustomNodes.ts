import { FeatureCardVM } from "@/lib/features/canvas/models/CanvasVM";
import { Node, NodeProps } from "@xyflow/react";

/**
 * The data inherited to the node
 */
//#region Data Types of Nodes
export type NumberNodeData = { number: number };
export type DependencyNodeData = { parents : string[], children: string[], color: string };

//#endregion

/**
 * The explicit type of the node
 */

//#region Node Types
export type NumberNodeType = Node<NumberNodeData, "number">;
export type DependencyNodeType = Node<DependencyNodeData, "dependency">;
//#endregion
