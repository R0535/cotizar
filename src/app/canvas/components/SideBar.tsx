import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FeatureForm from "./FeatureForm";

import { Node } from "@xyflow/react";
import { use, useEffect, useState } from "react";
import { ColorNodeData } from "../models/ColorNodes";
import { changeProjectName } from "@/lib/features/canvas/slices/ProjectsSlice";

export interface SideBarProps {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
}

export default function SideBar({ nodes, setNodes }: SideBarProps) {
  const dispatch = useAppDispatch(); //get the dispatch function from the store

  const currentProject = useAppSelector((state) => state.projects.project); //get the project name from the store

  const feature = useAppSelector((state) => state.features.feature); //get the selected feature from the store
  const nodesVM = useAppSelector((state) => state.features.nodes); //get the nodes from the store

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //set the name of the project
    dispatch(changeProjectName(e.target.value));
  };

  const [totalTime, setTotalTime] = useState<number>(
    calculateTotalTime(nodesVM)
  );
  //get the sum of the time of the nodes

  function calculateTotalTime(nodes: Node[]): number {
    let time = 0;
    nodes.forEach((node) => {
      time += parseInt(node.data?.time as string);
    });
    return time;
  }

  useEffect(() => {
    setTotalTime(calculateTotalTime(nodes));
  }, [nodesVM]);
  const createFeatureForm = useAppSelector(
    (state) => state.features.createFeatureForm
  ); //get the create feature form from the store
  const editFeatureForm = useAppSelector(
    (state) => state.features.editFeatureForm
  ); //get the edit feature form from the store
  return (
    <div className="w-full p-4 bg-gray-100 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Inspector de Detalles</h2>
      <h3 className="text-lg font-semibold">Proyecto</h3>
      <input
        type="text"
        value={currentProject?.name}
        onChange={handleProjectNameChange}
        
        className="w-full bg-white border border-gray-300 p-2 rounded-md mb-4"
      />
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Tiempo Total</h3>
        <p>{totalTime} Horas</p>
      </div>
      {(feature || createFeatureForm || editFeatureForm) && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Detalles de la Característica
          </h3>
          <FeatureForm nodes={nodes} setNodes={setNodes}></FeatureForm>
        </div>
      )}
    </div>
  );
}
