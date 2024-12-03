interface Estimation {
  id: string;
  name: string;
  description: string;

  createdAt: string;
  createdBy: string;
  projectId: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  logo: string;
  previews: string;
  status: string;
  statusDate: string;
  statusDescription: string;

  createdAt: string;
  createdBy: string;
}

export interface GetProjectDto {
  id: string;
  name: string;
  description: string;
  logo: string;
  previews: string;

  status?: string;
  statusDate?: string;
  statusDescription?: string;

  estimationSelectedId?: string;

  createdAt: string;
  createdBy: string;
  estimations: Estimation[];
}

export interface PostProjectRequest {
  name: string;
  description: string;
  logo: string;
  previews: string;
  createdAt: string;
  createdBy: string;

  status?: string;
  statusDate?: string;
  statusDescription?: string;

  estimationSelectedId?: string;
}
export interface PostProjectResponse {
  id: string;
}
export interface PutProjectRequest {
  id: string;
  name: string;
  description: string;
  logo: string;
  previews: string;

  status?: string;
  statusDate?: string;
  statusDescription?: string;

  estimationSelectedId?: string;
}
export interface PutProjectResponse {
  id: string;
}

export interface DeleteProjectRequest {
  id: string;
}
export interface DeleteProjectResponse {
  id: string;
}
