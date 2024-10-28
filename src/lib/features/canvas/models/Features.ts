import { GetAgentDto } from "../../agents/models/Agents";

export interface GetFeatureDto {
  id: string;
  email: string;
  name?: string;
  code?: string;
  active: boolean;
  deleted: boolean;
  agents: GetAgentDto[];
}

export interface PostFeatureRequest {
  email: string;
  name?: string;

  password: string;
  agentId?: string;
  createdById?: string;
}

export interface PostFeatureResponse {
  id: string;
  email: string;
  name?: string;
  code?: string;
  section: string;
  active: boolean;
  deleted: boolean;
}

export interface PutFeatureRequest {
  id: string;
  label: string;
  description: string;
  section: string;
  time: string;
  dependencies: string[];
  color: string;
  customProperties: { key: string; value: string }[];
}

export interface PutFeatureResponse {
  id: string;
  email: string;
  name?: string;
  code?: string;
  active: boolean;
  deleted: boolean;
}

export interface DeleteFeatureRequest {
  id: string;
}

export interface DeleteFeatureResponse {
  id: string;
  email: string;
  name?: string;
  code?: string;
  active: boolean;
  deleted: boolean;
}

//#region FeatureForm

export interface CreateFeatureFormErrors {
  labelError: string;
  sectionError: string;
  descriptionError: string;
  timeError: string;
  dependenciesError: string;
}
export interface EditFeatureFormErrors {
  idError: string;
  nameError: string;
  emailError: string;
  activeError: string;
  codeError: string;
  deletedError: string;
  agentIdError: string;
  sectionError: string;
}
//#endregion