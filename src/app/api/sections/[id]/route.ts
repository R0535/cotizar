import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
const prisma = new PrismaClient();
interface Params {
  params: {
    id: string;
  };
}

export async function GET( _r:NextRequest,{ params }: Params) {
  console.log("GET request", params);
  
  const { id } = params; // Obtener el `id` directamente desde `params`

  try {
    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    const section = await prisma.section.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });

    const sections = await prisma.section.findMany();
    console.log("sections", sections);

    return Response.json(section, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching section:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT( request:Request,{ params }: Params) {
  const { id } = params;
  const body = await request.json();

  console.log("PUT request", request + " - " + request.body);

  try {
    const updatedSection = await prisma.section.update({
      where: { id: parseInt(id.toString()) },
      data: { ...body },
    });

    if (updatedSection === null) {
      return Response.json(
        { error: "Failed to update Section. " },
        { status: 500 }
      );
    }

    return Response.json(updatedSection, { status: 200 });
  } catch (error: any) {
    return error.message;
  }
}

export async function DELETE(request: NextApiRequest) {
  console.log("DELETE request", request.query);

  const id = request.query;
  try {
    const deletedSection = await prisma.section.delete({
      where: { id: parseInt(id.toString()) },
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
