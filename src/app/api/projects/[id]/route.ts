import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { Mime } from "mime";
import { join } from "path";
import { mkdir, stat, writeFile } from "fs/promises";
const prisma = new PrismaClient();
interface Params {
  params: {
    id: string;
  };
}
export async function GET(_r: NextRequest, { params }: Params) {
  const { id } = params; // Obtener el `id` directamente desde `params`
  console.log("id", id);
  try {
    const project = await prisma.project.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    console.log("features", project);
    return NextResponse.json(project, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return error.message;
  } finally {
    prisma.$disconnect();
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = params;

  const formData = await request.formData();
  console.log("formData ------- ", formData);
  const body = Object.fromEntries(formData);
  console.log("body -           -", body);
  const preview = (formData.get("preview") as File) || null;
  const logo = (formData.get("logo") as File) || null;

  const buffer = Buffer.from(await preview.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;
  console.log("relativeUploadDir", relativeUploadDir);
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const logoFilename = `${uniqueSuffix}-${logo.name.replace(/\s/g, "-")}`;
    const prevFilename = `${uniqueSuffix}-${preview.name.replace(/\s/g, "-")}`;

    const previewPath = join(uploadDir, prevFilename);
    const logoPath = join(uploadDir, logoFilename);

    console.log("previewPath -*-*-*-*-*-*-*-*-*-*-*-*-*-*", previewPath);
    console.log("logoPath -*-*-*-*-*-*-*-*-*-*-*-*-*-*", logoPath);

    await writeFile(previewPath, buffer);
    await writeFile(logoPath, Buffer.from(await logo.arrayBuffer()));
    const previewUrl = `${relativeUploadDir}/${prevFilename}`;
    const logoUrl = `${relativeUploadDir}/${logoFilename}`;

    const updatedProject = await prisma.project.update({
      where: { id: id },
      data: {
        id: id,
        name: body.name as string,
        description: body.description as string,
        previews: previewUrl,
        createdBy: body.createdBy as string,
        logo: logoUrl,
        status: body.status as string || "UPDATED WITHOUT NEW DETAILS",
        statusDate: new Date(),
        statusDescription: body.statusDescription as string || null,
        estimationSelectedId: body.estimationSelectedId as string || null,
        
      },
    });

    if (updatedProject === null) {
      return NextResponse.json(
        { error: "Failed to update Project. " },
        { status: 500 }
      );
    }

    return Response.json(updatedProject.id, { status: 200 });
  } catch (error: any) {
    console.error("PUT - Project Error: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
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

    return NextResponse.json(deletedProject.id, { status: 200 });
  } catch (error: any) {
    return error.message;
  } finally {
    prisma.$disconnect();
  }
}
