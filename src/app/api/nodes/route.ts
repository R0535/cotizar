// src/app/api/nodes/route.ts
import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { ColorNodeType } from "@/app/canvas/models/ColorNodes";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

export async function GET() {
  console.log("GET request - Node");

  try {
    const nodes = await prisma.node.findMany();
    return NextResponse.json(nodes);
  } catch (error: any) {
    console.error("GET - Node Error: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

