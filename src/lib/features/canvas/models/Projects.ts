import { ColorNodeType } from '@/app/canvas/models/ColorNodes';
import { type Node } from '@xyflow/react';


export interface GetProjectDto {
  id: string;
  name: string;
  date: string;
  nodes: Node[];
}

export interface PostProjectRequest {
  id: string;
  name: string;
  nodes: ColorNodeType[];
  userId: string;
}



export interface CreateProjectFormErrors {
  nameError: string;
}
export interface PostProjectResponse {
  id: string;
  name: string;
  date: string;
  nodes: ColorNodeType[];
}





