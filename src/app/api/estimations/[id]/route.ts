import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
const prisma = new PrismaClient();

export async function GET({ query }: NextApiRequest) {
  console.log("GET estimations", query);

  try {
    const estimation = await prisma.estimation.findUniqueOrThrow({
      where: { id: String(query) },
    });
    return NextResponse.json(estimation);
  } catch (error: any) {
    return error.message;
  } finally {
    prisma.$disconnect();
  }
}

