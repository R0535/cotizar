import { Node, NodeProps } from "@xyflow/react";
import { NumberNodeData, NumberNodeType } from "../models/CustomNodes";

export default function NumberNode({ data }: NodeProps<NumberNodeType>) {
  return <div>A special number: {data.number}</div>;
}
