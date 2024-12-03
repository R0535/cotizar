import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { PostFeatureRequest } from "@/lib/features/canvas/models/Features";
import { Node } from "@xyflow/react";
import { ColorNodeType } from "@/app/canvas/models/ColorNodes";
import { create } from "domain";
import path, { join } from "path";
import fs from "fs";
import { useParams } from "next/navigation";
import { NextApiRequest } from "next";
import { error } from "console";
import { mkdir, stat, writeFile } from "fs/promises";
import { Mime } from "mime";

const prisma = new PrismaClient();
interface Params {
  params: {
    id: string;
  };
}
const uploadDir = path.join(process.cwd(), "/public/images");
const allowedFormats = ["image/png", "image/jpeg"];

export async function GET(_r: NextRequest, { params }: Params) {
  const { id } = params; // Obtener el `id` directamente desde `params`
  console.log("id", id);
  try {
    const features = await prisma.feature.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    console.log("features", features);
    return NextResponse.json(features);
  } catch (error: any) {
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
  const file = (formData.get("previews") as File) || null;
  console.log("file2- - - - - ", file);

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  //creating directory for the file
  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
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

    const extension =file.name.split(".").pop();

    console.log("extension", extension);
    if (!extension) {
      console.error("Tipo MIME no reconocido:", file.type);
      return NextResponse.json(
        { error: "Tipo de archivo no soportado." },
        { status: 400 }
      );
    }
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${extension}`;
    console.log("filename", filename);  
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;
    console.log("fileUrl", fileUrl);

    const section = await prisma.section.findUnique({
      where: { id: parseInt(body.sectionId.toString()) },
    });

    if (section === null) {
      return NextResponse.json(
        { error: "Invalid request No Section" },
        { status: 400 }
      );
    }
    console.log("body", body);

    const uFeature = await prisma.feature.update({
      where: { id: id },
      data: {
        ...body,
        sectionId: parseInt(body.sectionId.toString()),
        previews: fileUrl,
      },
    });
    if (uFeature === null) {
      return Response.json(
        { error: "Failed to create Feature." },
        { status: 500 }
      );
    }
    return Response.json(uFeature, { status: 201 });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(request: NextApiRequest) {
  const id = request.query;
  try {
    const deletedFeature = await prisma.feature.delete({
      where: { id: String(id) },
    });

    if (deletedFeature === null) {
      return NextResponse.json(
        { error: "Failed to delete Feature." },
        { status: 500 }
      );
    }

    return NextResponse.json(deletedFeature, { status: 200 });
  } catch (error: any) {
    return error.message;
  }
}
