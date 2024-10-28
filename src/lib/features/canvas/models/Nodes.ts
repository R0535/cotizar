import { CustomProperty } from "./CanvasVM";

export interface CreateNodeRequest {
  email: string;
  name?: string;
  password: string;
  agentId?: string;
  createdById?: string;
}

export interface EditNodeFormErrors {}



export interface CreateNodeFormErrors {
    label: string;
    description: string;
    time: number;
    section: string;
    dependencies: string;
    color: string;
}

export interface CreateNodeForm {
  label: string;
  description: string;
  time: number;
  section: string;
  dependencies: string;
  color: string;
  customProperties: CustomProperty[];
}
