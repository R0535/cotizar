import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
const prisma = new PrismaClient();

export async function GET({ query }: NextApiRequest) {
  console.log("GET nodes from estimation", query);

  try {
    const estimation = await prisma.node.findUniqueOrThrow({
      where: { id: String(query) },
    });
    if (estimation === null) {
      return NextResponse.json(
        { error: "Failed to find Node." },
        { status: 500 }
      );
    }

    console.log("200 > estimation > \n", estimation);
    const nodes = await prisma.node.findMany({
      where: { estimationId: estimation.id },
    });
    return NextResponse.json(nodes, { status: 200 });
  } catch (error: any) {
    return error.message;
  } finally {
    prisma.$disconnect();
  }
}
