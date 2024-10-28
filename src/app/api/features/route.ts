import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { PostFeatureRequest } from "@/lib/features/canvas/models/Features";
import { Node } from "@xyflow/react";
import { ColorNodeType } from "@/app/canvas/models/ColorNodes";
import { create } from "domain";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

const uploadDir = path.join(process.cwd(), "/public/images");
const allowedFormats = ["image/png", "image/jpeg"];

export async function GET() {
  try {
    const features = await prisma.feature.findMany();
    console.log("features", features);
    return NextResponse.json(features);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;

  try {
    const body = await request.json();

    const section = await prisma.section.findUnique({
      where: { id: body.sectionId },
    });

    if (section === null) {
      return NextResponse.json(
        { error: "Invalid request No Section" },
        { status: 400 }
      );
    }
    console.log("body", body);

    //handle save images and return the path
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      fs.writeFileSync(
        path.resolve(uploadDir, (body.file as File).name),
        buffer
      );
    } else {
      return NextResponse.json({
        success: false,
      });
    }

    const newFeature = await prisma.feature.create({
      data: {
        id: cuid(),
        label: body.label,
        description: body.description,
        tags: body.tags,
        color: body.color,

        timeBack: body.timeBack,
        timeFront: body.timeFront,

        previews: body.previews,

        sectionId: body.sectionId,
        section: {
          connect: {
            id: section.id,
          },
        },
      },
    });

    if (newFeature === null) {
      return NextResponse.json(
        { error: "Failed to create Feature." },
        { status: 500 }
      );
    }

    return NextResponse.json(newFeature, { status: 201 });
  } catch (error:any) {
    return error.message
  }
}



function cuid(): string | undefined {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}