// src/app/api/agents/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PostAgentRequest } from '@/lib/features/agents/models/Agents';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const agents = await prisma.agent.findMany();
    return NextResponse.json(agents);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const agentData = toCreatePrisma(body as PostAgentRequest);

    const newAgent = await prisma.agent.create({
      data: agentData,
    });
    return NextResponse.json(newAgent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Función helper para mapear el DTO a los datos de Prisma
export interface PrismaSchemaDto {
  id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  country: string;
  active: boolean;
  deleted: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  userId?: string;
}
function toCreatePrisma(dto: PostAgentRequest): PrismaSchemaDto {
  return {
    id : "",
    userId:"",
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
    createdBy: dto.creatorId,
    updatedBy: "",

  } 
}