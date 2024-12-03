import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { PostFeatureRequest } from "@/lib/features/canvas/models/Features";
import { Node } from "@xyflow/react";
import { ColorNodeType } from "@/app/canvas/models/ColorNodes";
import { Mime } from "mime";
import path, { join } from "path";
import fs from "fs";
import { mkdir, stat, writeFile } from "fs/promises";

const prisma = new PrismaClient();


export async function GET() {
  try {
    const features = await prisma.feature.findMany();
    console.log("features", features);
    return NextResponse.json(features);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  console.log("formData ------- ", formData);
  const body = Object.fromEntries(formData);
  console.log("body -           -", body);
  const file2 = (formData.get("preview") as File) || null;
  console.log("file2- - - - - ", file2);

  const buffer = Buffer.from(await file2.arrayBuffer());
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
    const extension =file2.name.split(".").pop();
    const filename = `${file2.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${extension}`;
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

    const newFeature = await prisma.feature.create({
      data: {
        id: cuid(),
        label: body.label as string,
        description: body.description as string,
        tags: body.tags as string,
        color: body.color as string,

        timeBack: parseInt(body.timeBack.toString()),
        timeFront: parseInt(body.timeFront.toString()),

        previews: fileUrl,

        sectionId: parseInt((body.sectionId as string).toString()),
      },
    });
    if (newFeature === null) {
      return Response.json(
        { error: "Failed to create Feature." },
        { status: 500 }
      );
    }
    return Response.json(newFeature, { status: 201 });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

function cuid(): string | undefined {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
