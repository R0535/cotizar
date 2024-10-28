import { type Node } from "@xyflow/react";



export interface CanvasVM {}

export interface FeatureCardVM {
  id: string;
  label: string;
  section: string;
  description: string;
  time: number;
  dependencies: string[];
  customProperties: CustomProperty[];
  color?: string;
  changeColor: ( color: string, node: Node) => void;
}

export interface ProjectVM{
  id: string;
  name: string;
  date: string;
  nodes: Node[];
}



export interface CustomProperty {
  key: string;
  value: string;
}
