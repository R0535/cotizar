// src/app/api/estimations/route.ts
import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { ColorNodeType } from "@/app/canvas/models/ColorNodes";
import { NextApiRequest } from "next";
import { url } from "inspector";
import { time, timeStamp } from "console";

const prisma = new PrismaClient();

export async function GET() {
  console.log("GET request - Estimation");

  try {
    const estimations = await prisma.estimation.findMany();
    return NextResponse.json(estimations);
  } catch (error: any) {
    console.error("GET - Estimation Error: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

export async function POST({ body }: NextApiRequest) {
  await body;
  try {
    console.log("POST Estimation", body);
    const newEstimation = await prisma.estimation.create({
      data: {
        ...body,
        nodes: undefined,
        estimationExports: undefined,
      },
    });

    if (newEstimation === null) {
      return NextResponse.json(
        { error: "Failed to create estimation." },
        { status: 500 }
      );
    }
    if (body.nodes) {
      console.log("POST Estimation Nodes", body.nodes);
      const nodes = await prisma.node.createMany({
        data: body.nodes?.map((node: ColorNodeType) => {
          return {
            id: node.id,
            label: node.data.label,
            timeBack: parseInt(node.data.timeBack.toString()),
            timeFront: parseInt(node.data.timeFront.toString()),
            description: node.data.description,

            baseFeature: node.data.baseFeature,
            tags: node.data.tags,

            type: node.type,
            color: node.data.color,
            section: node.data.section,
            positionX: node.position.x,
            positionY: node.position.y,
            width: node.measured?.width,
            height: node.measured?.height,

            projectId: newEstimation.projectId,
            estimationId: newEstimation.id,

            dependencies: undefined,
          };
        }),
      });

      if (nodes === null) {
        return NextResponse.json(
          { error: "Failed to create nodes." },
          { status: 500 }
        );
      } else {
        console.log("POST Estimation Nodes", nodes);

        const dependencies = await prisma.dependency.createMany({
          data: body.nodes
            .map((node: ColorNodeType) => {
              return node.data.dependencies.map((dependency) => {
                return {
                  value: dependency,
                  nodeId: node.id, //todo: all nodes should have an id from the start
                };
              });
            })
            .flat(),
        });

        if (dependencies === null) {
          return NextResponse.json(
            { error: "Failed to create dependencies." },
            { status: 500 }
          );
        }
      }
    }
    // if (body.estimationExports) {
    //   console.log("POST Estimation Export", body.estimationExports);
    //   const estimationExports = await prisma.estimationExport.createMany({
    //     data: body.estimationExports.map((exportData: any) => {
    //       return {
    //         id: undefined,
    //         estimationId: newEstimation.id,
    //         data: exportData.data,
    //         url: exportData.url,
    //       };
    //     }),
    //   });

    //   if (estimationExports === null) {
    //     return NextResponse.json(
    //       { error: "Failed to create estimation exports." },
    //       { status: 500 }
    //     );
    //   }
    // }

    return NextResponse.json(newEstimation, { status: 201 });
  } catch (error: any) {
    console.error("PROJECT ERROR - POST", error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
