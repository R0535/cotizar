import { ProjectVM } from "@/lib/features/canvas/models/CanvasVM";
import {
  GetProjectDto,
  PostProjectRequest,
  PostProjectResponse,
} from "@/lib/features/canvas/models/Projects";
import { PrismaClient } from "@prisma/client";




const prisma = new PrismaClient();

export class ProjectsApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getProjects(): Promise<ProjectVM[]> {
    // const response = await fetch(`${this.baseUrl}/projects`, {
    //   method: "GET",
    // });

    // if (!response.ok) {
    //   throw new Error(`Error fetching projects: ${response.statusText}`);
    // }
    // return response.json();
    try {
      const projects = await prisma.project.findMany();

      if (!projects) {
        throw new Error("Failed to fetch projects");
      }
      console.log("projects", projects);
      
      const proyectsDtos: ProjectVM[] = projects.map((project: any) => {
        return {
          id: project.id,
          name: project.name,
          nodes: project.nodes,
          date: project.create,
        };
      });

      
      
      return proyectsDtos;
    } catch (error) {
      throw new Error(`Error fetching projects: ${error}`);
    }


  }


  async createProject(
    projectData: PostProjectRequest
  ): Promise<PostProjectResponse> {

    projectData.nodes.map((node) => {
      parseInt(node.data.time.toString())
    });
    console.log("nodes",projectData.nodes);
    const response = await fetch(`${this.baseUrl}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Error creating project: ${response.statusText}`);
    }
    return response.json();
  }
}
