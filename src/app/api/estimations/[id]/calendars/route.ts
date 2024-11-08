import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
const prisma = new PrismaClient();

export async function GET({ query }: NextApiRequest) {
  console.log("GET estimations", query);

  try {
    const calendars = await prisma.calendar.findMany({
      where: { estimationId: String(query) },
    });

    return NextResponse.json(calendars);
  } catch (error: any) {
    return error.message;
  } finally {
    prisma.$disconnect();
  }
}

