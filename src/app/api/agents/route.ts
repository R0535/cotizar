// src/app/api/agents/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PostAgentRequest } from '@/lib/features/agents/models/Agents';
import { toCreatePrisma } from './models/models';

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


