import {
  getStraightPath,
  BaseEdge,
  type EdgeProps,
  type Edge,
} from "@xyflow/react";

/**
 * The data inherited to the node
 */
//#region Data Types of Nodes
type CustomEdgeData = { value: number };

//#endregion

/**
 * The explicit type of the node
 */

//#region Node Types
export type CustomEdgeType = Edge<{ value: number }, "custom">;
//#endregion
