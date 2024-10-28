import {
  PostAgentRequest,
  PutAgentRequest,
} from "@/lib/features/agents/models/Agents";
import { randomUUID } from "crypto";

export interface PrismaSchemaDto {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;

  phone: string;
  email: string;

  active: boolean;
  deleted: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export function toCreatePrisma(
  dto: PostAgentRequest | PutAgentRequest
): PrismaSchemaDto {
  if ("id" in dto) {
    dto = dto as PutAgentRequest;
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      zip: dto.zip,
      country: dto.country,
      active: true,
      deleted: false,
      updatedAt: new Date(),
      deletedAt: null,
    };
  } else {
    return {
      id: randomUUID(),
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      zip: dto.zip,
      country: dto.country,
      active: true,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
  }
}
