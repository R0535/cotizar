import { BaseEdge, EdgeProps, getStraightPath } from "@xyflow/react";
import { CustomEdgeType } from "../models/CustomEdges";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps<CustomEdgeType>) {
  const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

  return <BaseEdge id={id} path={edgePath} />;
}
