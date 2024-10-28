import { Prisma, PrismaClient } from "@prisma/client";
import { Node } from "@xyflow/react";
import { ColorNodeType } from "@/app/canvas/models/ColorNodes";
import { create } from "domain";
import path from "path";
import fs from "fs";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const uploadDir = path.join(process.cwd(), "/public/images");
const allowedFormats = ["image/png", "image/jpeg"];

export async function GET() {
  try {
    const sections = await prisma.section.findMany();
    console.log("sections", sections);
    return NextResponse.json(sections, { status: 200 });
  } catch (error: any) {
    return error.message;
  }
}

export async function POST(request: NextApiRequest) {
  const body = await request.body();
  try {
    const newSection = await prisma.section.create({
      data: {
        id: cuid(),
        name: body.label,
        description: body.description,
      },
    });

    if (newSection === null) {
      return NextResponse.json(
        { error: "Failed to create Section." },
        { status: 500 }
      );
    }

    return NextResponse.json(newSection, { status: 201 });
  } catch (error:any) {
    return error.message
  }
}

function cuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
