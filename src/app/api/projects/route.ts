// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { ColorNodeType } from "@/app/canvas/models/ColorNodes";
import { NextApiRequest } from "next";
import { Mime } from "mime";

import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

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

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const bodyData = Object.fromEntries(formData);

  console.log("POST request - PROJECTS", bodyData);
  console.log("formData", formData);
  console.log("bodyData", bodyData);
  const logo = (formData.get("logo") as File) || null;
  const preview = (formData.get("preview") as File) || null;

  const buffer = Buffer.from(await logo.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e: any) {
    console.error("Error ", e);
    console.error("Code", e.code);
    console.error("Message", e.message);
    return Response.json({ error: e }, { status: 500 });
  }

  try {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);


    const logoName = `${uniqueSuffix}-${logo.name.replace(/\s/g, "-")}`;
    const previewName = `${uniqueSuffix}-${preview.name.replace(/\s/g, "-")}`;

    console.log("logoName *-*--*/-*-*/*-*--*/-*-*/*-*--*/-*-*/ \n", logoName);
    console.log("previewName *-*--*/-*-*/ \n", previewName);

    const logoPath = join(uploadDir, logoName);
    const previewPath = join(uploadDir, previewName);

    await writeFile(logoPath, buffer);
    await writeFile(previewPath, Buffer.from(await preview.arrayBuffer()));

    const logoUrl = `${relativeUploadDir}/${logoName}`;
    const previewUrl = `${relativeUploadDir}/${previewName}`;

    const newProject = await prisma.project.create({
      data: {
        name: bodyData.name as string,
        description: bodyData.description as string,
        logo: logoUrl,
        previews: previewUrl,
        createdBy: bodyData.createdBy as string,
        status: "CREATED",
        statusDate: new Date(),
        statusDescription: "Project created."


      },
    });

    if (newProject === null) {
      return Response.json(
        { error: "Failed to create project." },
        { status: 500 }
      );
    }
    return Response.json(newProject.id, { status: 201 });
  } catch (error: any) {
    console.error("POST - Project Error: ", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

// export async function POST({ body }: NextApiRequest) {
//   await body;
//   try {
//     console.log("POST Project", body);
//     const newProject = await prisma.project.create({
//       data: {
//         ...body,
//         nodes: undefined,
//       },
//     });

//     if (newProject === null) {
//       return NextResponse.json(
//         { error: "Failed to create project." },
//         { status: 500 }
//       );
//     }
//     if (!body.nodes) {
//       return NextResponse.json(newProject, { status: 201 });
//     }

//     const nodes = await prisma.node.createMany({
//       data: body.nodes?.map((node: ColorNodeType) => {
//         return {
//           id: node.id,
//           label: node.data.label,
//           time: parseInt(node.data.time.toString()),
//           description: node.data.description,
//           color: node.data.color,
//           type: node.type,
//           section: node.data.section,
//           positionX: node.position.x,
//           positionY: node.position.y,
//           width: node.measured?.width,
//           height: node.measured?.height,

//           ProjectId: newProject.id,
//         };
//       }),
//     });

//     if (nodes === null) {
//       return NextResponse.json(
//         { error: "Failed to create nodes." },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(newProject, { status: 201 });
//   } catch (error: any) {
//     console.error("PROJECT ERROR - POST", error.message);

//     return NextResponse.json({ error: error.message }, { status: 500 });
//   } finally {
//     prisma.$disconnect();
//   }
// }
