import { GetAgentDto } from "@/lib/features/agents/models/Agents";
import { PostUserRequest } from "@/lib/features/users/models/Users";

export interface Session {
  id: string;
  userId: string;
  userAgent: string;
  ip: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Action {
  id: string;
  userId: string;
  action: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface PrismaSchemaDto {
  id: string;
  email: string;
  name?: string;
  passwordHash: string;
  code?: string;

  active: boolean;
  deleted: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;

  createdById?: string;
  createdBy?: PrismaSchemaDto;
  updatedById?: string;
  updatedBy?: PrismaSchemaDto;

  createdUsers?: PrismaSchemaDto[];
  updatedUsers?: PrismaSchemaDto[];

  createdAgents?: GetAgentDto[];
  agents?: GetAgentDto[];

  sessions?: Session[];
  actions?: Action[];
}


export function toCreatePrisma(dto: PostUserRequest): PrismaSchemaDto {
  return {
    id: "",
    email: dto.email,
    name: dto.name,
    active: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    passwordHash: "",
    code: "",
    
  };
}
