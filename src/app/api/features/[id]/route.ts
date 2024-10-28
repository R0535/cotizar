import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { PostFeatureRequest } from "@/lib/features/canvas/models/Features";
import { Node } from "@xyflow/react";
import { ColorNodeType } from "@/app/canvas/models/ColorNodes";
import { create } from "domain";
import path from "path";
import fs from "fs";
import { useParams } from "next/navigation";
import { NextApiRequest } from "next";
import { error } from "console";

const prisma = new PrismaClient();

const uploadDir = path.join(process.cwd(), "/public/images");
const allowedFormats = ["image/png", "image/jpeg"];

export async function GET(request: NextApiRequest) {
  const id = request.query;
  try {
    const features = await prisma.feature.findMany({
      where: {
        sectionId: id,
      },
    });

    return NextResponse.json(features);
  } catch (error:any) {
    return error.message
  }
}

export async function PUT(request: NextApiRequest) {
  const body = await request.body;
  const id = request.query;
  //handle save images and return the path
  if (body.file) {
    const buffer = Buffer.from(body.file, "base64");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    fs.writeFileSync(path.resolve(uploadDir, body.fileName), buffer);
  }

  try {
    const updatedFeature = await prisma.feature.update({
      where: { id: String(id) },
      data: {
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
            id: body.sectionId,
          },
        },
      },
    });

    if (updatedFeature === null) {
      return NextResponse.json(
        { error: "Failed to update Feature. " },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedFeature, { status: 200 });
  } catch (error: any) {
    return error.message;
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


