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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const isEnumRequest = url.searchParams.get("enum") === "true"; // Verifica si el query `enum` está presente

  try {
    if (isEnumRequest) {
      // Si el parámetro `enum=true` está presente, solo devuelve `id` y `name`
      const sections = await prisma.section.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          id: "desc",
        },
      });
      return Response.json(sections, { status: 200 });
    } else {
      // Si `enum` no está presente, devuelve la respuesta completa
      const sections = await prisma.section.findMany({
        include: {
          features: true,
        },
        orderBy: {
          id: "desc",
        },
      });
      return Response.json(sections, { status: 200 });
    }
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {

  const body = await request.json();

  try {
    const newSection = await prisma.section.create({
      data: {
        name: body.name,
        description: body.description,
      },
    });

    if (newSection === null) {
      return Response.json(
        { error: "Failed to create Section." },
        { status: 500 }
      );
    }

    return Response.json(newSection, { status: 201 });
  } catch (error:any) {
    console.log("error", error);
    console.log("error.message", error.message);  
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function cuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
