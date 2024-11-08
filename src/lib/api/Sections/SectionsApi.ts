import { GetSectionDto, GetSectionEnum, PostSectionRequest, PostSectionResponse, PutSectionResponse } from "@/lib/features/sections/models/Sections";


export class SectionsApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getSections(): Promise<GetSectionDto[]> {
    const response = await fetch(`${this.baseUrl}/sections`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching sections: ${response.statusText}`);
    }
    return response.json();
  }
  async getSectionsEnum(): Promise<GetSectionEnum[]> {
    const response = await fetch(`${this.baseUrl}/sections?enum=true`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching sections: ${response.statusText}`);
    }
    return response.json();
  }
  async getSection(id:number): Promise<GetSectionDto> {
    const response = await fetch(`${this.baseUrl}/sections/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching sections: ${response.statusText}`);
    }
    return response.json();
  }
  async getSectionById(sectionId: string): Promise<GetSectionDto> {
    const response = await fetch(`${this.baseUrl}/sections/${sectionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching section: ${response.statusText}`);
    }

    return response.json();
  }

  async createSection(sectionData: PostSectionRequest): Promise<PostSectionResponse> {
    const response = await fetch(`${this.baseUrl}/sections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sectionData),
    });

    if (!response.ok) {
      throw new Error(`Error creating section: ${response.statusText}`);
    }
    return response.json();
  }

  async updateSection(
    sectionId: string,
    sectionData: any
  ): Promise<PutSectionResponse> {
    const response = await fetch(`${this.baseUrl}/sections/${sectionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sectionData),
    });

    if (!response.ok) {
      throw new Error(`Error updating section: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteSection(sectionId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/sections/${sectionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting section: ${response.statusText}`);
    }
  }
}
