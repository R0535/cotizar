import { GetAgentDto } from "../../agents/models/Agents";


export interface GetUserDto {
  id: string;
  email: string;
  name?: string;
  code?: string;
  active: boolean;
  deleted: boolean;
  agents: GetAgentDto[];
}

export interface PostUserRequest {
  email: string;
  name?: string;
  password: string;
  agentId?: string;
  createdById?: string;
}

export interface PostUserResponse {
  id: string;
  email: string;
  name?: string;
  code?: string;

  active: boolean;
  deleted: boolean;
}

export interface PutUserRequest {
  id: string;
  email?: string;
  name?: string;
  code?: string;
  agentId?: string;
  active?: boolean;
  updatedById?: string;
}

export interface PutUserResponse {
  id: string;
  email: string;
  name?: string;
  code?: string;
  active: boolean;
  deleted: boolean;
}

export interface DeleteUserRequest {
  id: string;
}

export interface DeleteUserResponse {
  id: string;
  email: string;
  name?: string;
  code?: string;
  active: boolean;
  deleted: boolean;
}
