import { GetFeatureDto, PostFeatureResponse, PutFeatureResponse } from "@/lib/features/features/models/Features";


export class FeaturesApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getFeatures(): Promise<GetFeatureDto[]> {
    const response = await fetch(`${this.baseUrl}/features`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching features: ${response.statusText}`);
    }
    return response.json();
  }

  async getFeature(featureId: string): Promise<GetFeatureDto> {
    const response = await fetch(`${this.baseUrl}/features/${featureId}`, {
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

  async createFeature(featureData: FormData): Promise<PostFeatureResponse> {
    const response = await fetch("/api/features", {
      method: "POST",
      body: featureData,
    });

    if (!response.ok) {
      throw new Error(`Error creating feature: ${response.statusText}`);
    }
    return response.json();
  }

  async updateFeature(
    featureId: string,
    featureData: FormData
  ): Promise<PutFeatureResponse> {
    const response = await fetch(`${this.baseUrl}/features/${featureId}`, {
      method: "PUT",
      body: featureData,
    });

    if (!response.ok) {
      throw new Error(`Error updating feature: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteFeature(featureId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/features/${featureId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting feature: ${response.statusText}`);
    }
  }
}
