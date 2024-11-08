// src/app/api/projects/route.ts
import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { ColorNodeType } from "@/app/canvas/models/ColorNodes";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

export async function GET() {
  console.log("GET request");

  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("GET - Project Error: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

export async function POST({ body }: NextApiRequest) {
  await body;
  try {
    console.log("POST Project", body);
    const newProject = await prisma.project.create({
      data: {
        ...body,
        nodes: undefined,
      },
    });

    if (newProject === null) {
      return NextResponse.json(
        { error: "Failed to create project." },
        { status: 500 }
      );
    }
    if (!body.nodes) {
      return NextResponse.json(newProject, { status: 201 });
    }

    const nodes = await prisma.node.createMany({
      data: body.nodes?.map((node: ColorNodeType) => {
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

    if (nodes === null) {
      return NextResponse.json(
        { error: "Failed to create nodes." },
        { status: 500 }
      );
    }

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error("PROJECT ERROR - POST", error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
