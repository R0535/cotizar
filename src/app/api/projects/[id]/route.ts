import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
const prisma = new PrismaClient();

export async function GET({ query }: NextApiRequest) {
  console.log("GET projects", query);

  try {
    const project = await prisma.project.findUniqueOrThrow({
      where: { id: String(query) },
    });
    return NextResponse.json(project);
  } catch (error: any) {
    return error.message;
  } finally {
    prisma.$disconnect();
  }
}

export async function PUT({query, body}: NextApiRequest) {
  await body;
  console.log("PUT project", query + " - " + body);
  try {
    const updatedProject = await prisma.project.update({
      where: { id: String(query) },
      data: { ...body },
    });

    if (updatedProject === null) {
      return NextResponse.json(
        { error: "Failed to update Project. " },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error: any) {
    return error.message;
  } finally {
    prisma.$disconnect();
  }
}

export async function DELETE(request: NextApiRequest) {
  console.log("DELETE project", request.query);

  const id = request.query;
  try {
    const deletedProject = await prisma.project.delete({
      where: { id: String(id) },
    });

    if (deletedProject === null) {
      return NextResponse.json(
        { error: "Failed to delete Project." },
        { status: 500 }
      );
    }

    return NextResponse.json(deletedProject, { status: 200 });
  } catch (error: any) {
    return error.message;
  } finally {
    prisma.$disconnect();
  }
}
