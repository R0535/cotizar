import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
const prisma = new PrismaClient();

export async function GET({ query }: NextApiRequest) {
  console.log("GET estimations", query);

  try {
    const exports = await prisma.estimationExport.findMany({
      where: { estimationId: String(query) },
    });

    return NextResponse.json(exports);
  } catch (error: any) {
    return error.message;
  } finally {
    prisma.$disconnect();
  }
}

