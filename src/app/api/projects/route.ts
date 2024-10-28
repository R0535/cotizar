// src/app/api/projects/route.ts
import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { PostProjectRequest } from "@/lib/features/canvas/models/Projects";
import { Node } from "@xyflow/react";
import { ColorNodeType } from "@/app/canvas/models/ColorNodes";
import { create } from "domain";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    console.log("projects", projects);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const agent = await prisma.agent.findUnique({ where: { id: body.userId } });

    if (body === null || agent === null) {
      return NextResponse.json(
        { error: "Invalid request No AgentFound" },
        { status: 400 }
      );
    }

    console.log("body", body);

    body.nodes.forEach((node: ColorNodeType) => {
      console.log("node", node);
    });

    const newProject = await prisma.project.create({
      data: {
        id: body.id,
        name: body.name,
        createdBy: { connect: { id: agent?.id } },
        nodes: undefined,
      },
    });

    if (newProject === null) {
      return NextResponse.json(
        { error: "Failed to create project." },
        { status: 500 }
      );
    }

    const nodes = await prisma.node.createMany({
      data: body.nodes.map((node: ColorNodeType) => {
        return {
          id: node.id,
          label: node.data.label,
          time: parseInt(node.data.time.toString()),
          description: node.data.description,
          color: node.data.color,
          type: node.type,
          section: node.data.section,
          positionX: node.position.x,
          positionY: node.position.y,
          width: node.measured?.width,
          height: node.measured?.height,
          

          ProjectId: newProject.id,
        };
      }),
    });

    console.log("nodes", nodes);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {

    console.error("ERRRRRROR", error);

    // Manejo de errores específicos de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Manejo de errores conocidos
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Duplicate entry detected." },
          { status: 400 }
        );
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json(
        { error: "Validation error occurred. " + error },
        { status: 400 }
      );
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return NextResponse.json(
        { error: "An unknown error occurred with Prisma." },
        { status: 500 }
      );
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        { error: "Prisma failed to initialize." },
        { status: 500 }
      );
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
      return NextResponse.json(
        { error: "A Prisma internal error occurred." },
        { status: 500 }
      );
    }

    // Para cualquier otro error, retornamos una respuesta genérica
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
