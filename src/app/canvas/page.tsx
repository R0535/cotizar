"use client";
import { saveAs } from "file-saver";
import { Parser } from "json2csv";
import {
  MiniMap,
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type NodeTypes,
  type DefaultEdgeOptions,
  SelectionMode,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
} from "@xyflow/react";
import React, { useCallback, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import SideBar from "./components/SideBar";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createFeature,
  handleClear,
  setFeature,  
} from "@/lib/features/features/slices/FeaturesSlice";
import { handleCreate, handleEdit, setNodesVM } from "@/lib/features/canvas/slices/NodesSlice";
import { useSelector } from "react-redux";
import { CustomProperty } from "@/lib/features/canvas/models/CanvasVM";
import { FeatureCardVM } from "@/lib/features/canvas/models/CanvasVM";
import { on } from "events";
import ColorNode from "./components/ColorNode";
import { ColorNodeData } from "./models/ColorNodes";
import { createProject, fetchProjects } from "@/lib/features/canvas/slices/ProjectsSlice";
import { PostProjectRequest } from "@/lib/features/canvas/models/Projects";

//#region Initial Config
const panOnDrag = [1, 2];

//change color handle

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const nodeTypes: NodeTypes = { colorNode: ColorNode };

//#endregion

//#region Event Handlers
const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log("drag event", node.data);
};
//#endregion

export default function Index() {
  const dispatch = useAppDispatch();
  dispatch(fetchProjects());

  //#region Initial States

  const changeColor = (
    node: ColorNodeData,
    color: string,
    initNodes: Node[],
    setNodes: (nodes: Node[]) => void
  ) => {
    const oldNode = initNodes.find((n) => n.data.id === node.id);
    if (!oldNode) return;

    const newNodes = initNodes.filter((n) => n.data.id !== node.id);

    const newNode = {
      ...oldNode,
      data: {
        ...oldNode.data,
        color: color,
      },
    };

    newNodes.push(newNode);
    setNodes(newNodes);
  };
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const storeNodes = useAppSelector((state) => state.nodes.nodes);

  const project = useAppSelector((state) => state.projects.project);
  //#endregion

  //#region Callbacks
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds ?? [])),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds ?? [])),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds ?? [])),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const feature: FeatureCardVM = {
      id: node.data?.id as string,
      label: node.data?.label as string,
      description: node.data?.description as string,
      time: node.data?.time as number,
      section: node.data?.section as string,
      dependencies: node.data?.dependencies as string[],
      customProperties: node.data?.customProperties as CustomProperty[],
      color: node.data?.color as string,
      changeColor(color: string, node: Node) {
        changeColor(node.data as any, color, nodes, setNodes);
      },
    };
    dispatch(handleClear());
    dispatch(handleEdit(feature));
  }, []);

  const onSelectionChange = useCallback((nodes: Node[], edges: Edge[]) => {
    console.log("nodes", nodes);
    console.log("edges", edges);
  }, []);
  //#endregion

  //#region Handlers
  const handleSaveProject = async () => {
    const createProjectResponse = await dispatch(
      createProject({
        id: project?.id,
        name: project?.name,
        nodes: nodes,
        userId: "1",
      } as PostProjectRequest)
    );

    //saving the nodes as json or dto to the backend
    dispatch(setNodesVM(nodes));
  };

  const handleExportToCSV = () => {
    console.log("export to csv");
    // Extraer solo los datos necesarios para el CSV
    const dataForCsv = nodes.map((node) => ({
      id: node.data?.id,
      feature: node.data?.label,
      seccion: node.data?.section,
      tiempoHoras: node.data?.time,
      description: node.data?.description,
      dependencies: (node.data?.dependencies as string[]).join(", "),
    }));

    // Configurar el parser de json2csv
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(dataForCsv);

    // Crear un blob con el contenido del CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Usar file-saver para descargar el archivo
    saveAs(blob, "nodes-data.csv");
  };
  //#endregion
  //#region Effects
  useEffect(() => {
    console.log("nodes changeeeeed");
    console.log(nodes);
  }, [nodes]);

  useEffect(() => {
    if (storeNodes) {
      console.log("store nodes changeeeeed");
      console.log(storeNodes);
      if (nodes !== storeNodes) setNodes(storeNodes);
    }
  }, [storeNodes]);
  //#endregion

  return (
    <div
      className=" h-[90vh] flex flex-col
                  md:flex-row"
    >
      <div className="w-full ">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDrag={onNodeDrag}
          panOnScroll
          selectionOnDrag
          panOnDrag={panOnDrag}
          onNodeClick={onNodeClick}
          selectionMode={SelectionMode.Partial}
          defaultEdgeOptions={defaultEdgeOptions}
          fitViewOptions={fitViewOptions}
          fitView
          nodeTypes={nodeTypes}
        >
          <Panel position="top-left">
            <div className="w-full h-32 inline gap-2 align-middle space-x-2">
              <Button
                onClick={() => {
                  dispatch(handleCreate());
                }}
              >
                Agregar
              </Button>
              <Button
                onClick={() => {
                  handleSaveProject();
                }}
              >
                Guardar Proyecto
              </Button>

              <Button>Ver Calendario</Button>
              <Button onClick={handleExportToCSV}>Exportar a csv</Button>
              <Button>Exportar a pdf</Button>
              <Button>Button</Button>
            </div>
          </Panel>

          <MiniMap />
          <Controls />
          <Background color="#00cc00" variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
      <div
        className="bg-blue-500    h-56        w-full   overflow-y-auto             
                    md:h-full  md:w-96 md:min-w-96 md:overflow-y-hidden
                    
                   "
      >
        <SideBar nodes={nodes} setNodes={setNodes}></SideBar>
      </div>
    </div>
  );
}
