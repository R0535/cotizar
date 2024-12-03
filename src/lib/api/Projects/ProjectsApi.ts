import {
  DeleteProjectResponse,
  GetProjectDto,
  PostProjectRequest,
  PostProjectResponse,
  PutProjectResponse,
} from "../../features/projects/models/Projects";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProjectsApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getProjects(): Promise<GetProjectDto[]> {
    const response = await fetch(`${this.baseUrl}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching features: ${response.statusText}`);
    }
    return response.json();
  }
  async getProject(projectId: string): Promise<GetProjectDto> {
    const response = await fetch(`${this.baseUrl}/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching feature: ${response.statusText}`);
    }

    return response.json();
  }

  // async getProjects(): Promise<GetProjectDto[]> {
  //   // const response = await fetch(`${this.baseUrl}/projects`, {
  //   //   method: "GET",
  //   // });

  //   // if (!response.ok) {
  //   //   throw new Error(`Error fetching projects: ${response.statusText}`);
  //   // }
  //   // return response.json();
  //   try {
  //     const projects = await prisma.project.findMany();

  //     if (!projects) {
  //       throw new Error("Failed to fetch projects");
  //     }
  //     console.log("projects", projects);

  //     const proyectsDtos: GetProjectDto[] = projects.map((project: any) => {
  //       return {
  //         id: project.id,
  //         name: project.name,
  //         description: project.description,
  //         logo: project.logo,
  //         previews: project.previews,
  //         createdAt: project.createdAt,
  //         createdBy: project.createdBy,
  //       };
  //     });

  //     return proyectsDtos;
  //   } catch (error) {
  //     throw new Error(`Error fetching projects: ${error}`);
  //   }

  // }

  async createProject(
    projectData: FormData
  ): Promise<PostProjectResponse> {
    const response = await fetch(`${this.baseUrl}`, {
      method: "POST",
      body: projectData,
    });

    if (!response.ok) {
      throw new Error(`Error creating project: ${response.statusText}`);
    }
    return response.json();
  }

  // async createProject(
  //   projectData: PostProjectRequest
  // ): Promise<PostProjectResponse> {

  //   projectData.nodes.map((node) => {
  //     parseInt(node.data.time.toString())
  //   });
  //   console.log("nodes",projectData.nodes);
  //   const response = await fetch(`${this.baseUrl}/projects`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(projectData),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Error creating project: ${response.statusText}`);
  //   }
  //   return response.json();
  // }

  async updateProject(
    projectId: string,
    projectData: FormData
  ): Promise<PutProjectResponse> {
    const response = await fetch(`${this.baseUrl}/${projectId}`, {
      method: "PUT",
      body: projectData,
    });

    if (!response.ok) {
      throw new Error(`Error updating project: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteProject(projectId: string): Promise<DeleteProjectResponse> {
    const response = await fetch(`${this.baseUrl}/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting project: ${response.statusText}`);
    }
    
    return response.json();
  }
}
