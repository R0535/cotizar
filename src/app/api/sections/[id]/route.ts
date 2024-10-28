import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
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
    const sections = await prisma.section.findMany({
      where: {
        id: id,
      },
    });

    return NextResponse.json(sections);
  } catch (error:any) {
    return error.message
  }
}

export async function PUT(request: NextApiRequest) {
  const body = await request.body;
  const id = request.query;
  //handle save images and return the path


  try {
    const updatedSection = await prisma.section.update({
      where: { id: String(id) },
      data: {
        name: body.name,
        description: body.description,        
      },
    });

    if (updatedSection === null) {
      return NextResponse.json(
        { error: "Failed to update Section. " },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedSection, { status: 200 });
  } catch (error: any) {
    return error.message;
  }
}

export async function DELETE(request: NextApiRequest) {
  const id = request.query;
  try {
    const deletedSection = await prisma.section.delete({
      where: { id: String(id) },
    });

    if (deletedSection === null) {
      return NextResponse.json(
        { error: "Failed to delete Section." },
        { status: 500 }
      );
    }

    return NextResponse.json(deletedSection, { status: 200 });
  } catch (error: any) {
    return error.message;
  }
}


