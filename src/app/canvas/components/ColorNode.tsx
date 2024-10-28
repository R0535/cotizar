import { FeatureCardVM } from "@/lib/features/canvas/models/CanvasVM";
import { Handle, Position, type NodeProps, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useState } from "react";
import { ColorNodeData, ColorNodeType } from "../models/ColorNodes";
import { useAppDispatch } from "@/lib/hooks";
import { updateNode } from "@/lib/features/canvas/slices/FeaturesSlice";

export default function ColorNode(nodeProps: NodeProps<ColorNodeType>) {
  const dispatch = useAppDispatch();

  const handleColorChange = (color: string) => {
    dispatch(
      updateNode({
        ...nodeProps,
        data: {
          ...nodeProps.data,
          color: color,
        },
        position: {
          x: nodeProps.positionAbsoluteX,
          y: nodeProps.positionAbsoluteY,
        },
      })
    );
  };

  return (
    <div
      style={{
        backgroundColor: nodeProps.data?.color as string | "gray",
        borderRadius: 10,
      }}
      className="min-w-32 max-w-56 "
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} />
      <div className="p-2 flex flex-row justify-between bg-primary rounded-t-lg">
        <input
          type="color"
          defaultValue={nodeProps.data.color as string | "#6F6F6FFF"}
          onChange={(evt) => handleColorChange(evt.target.value)}
          className="nodrag m-0 p-0 border-0 w-5 h-5 "
        />

        <h1 className="font-bold text-secondary">
          {nodeProps.data.label as string}
        </h1>
      </div>

      <div className="p-2">
        <h2 className="font-bold">Descripción</h2>
        <p className="text-accent">{nodeProps.data.description as string}</p>
        <h2 className=" font-bold">Tiempo</h2>
        <p className="text-accent">{nodeProps.data.time as number} horas</p>
      </div>

      <div className="p-2">
        <h2 className="font-bold">Dependencias</h2>
        <ul className="border-2 px-2 max-h-32 overflow-y-auto text-accent">
          {nodeProps.data.dependencies.map((dependency) => (
            <li key={dependency}>{dependency}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
