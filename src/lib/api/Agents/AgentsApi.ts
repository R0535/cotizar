import { GetAgentDto, PostAgentRequest, PostAgentResponse, PutAgentResponse } from "@/lib/features/agents/models/Agents";


export class AgentsApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAgents(): Promise<GetAgentDto[]> {
    const response = await fetch(`${this.baseUrl}/agents`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching agents: ${response.statusText}`);
    }
    return response.json();
  }

  async getAgentById(agentId: string): Promise<GetAgentDto> {
    const response = await fetch(`${this.baseUrl}/agents/${agentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching agent: ${response.statusText}`);
    }

    return response.json();
  }

  async createAgent(agentData: PostAgentRequest): Promise<PostAgentResponse> {
    const response = await fetch(`${this.baseUrl}/agents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agentData),
    });

    if (!response.ok) {
      throw new Error(`Error creating agent: ${response.statusText}`);
    }
    return response.json();
  }

  async updateAgent(
    agentId: string,
    agentData: any
  ): Promise<PutAgentResponse> {
    const response = await fetch(`${this.baseUrl}/agents/${agentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agentData),
    });

    if (!response.ok) {
      throw new Error(`Error updating agent: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteAgent(agentId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/agents/${agentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting agent: ${response.statusText}`);
    }
  }
}
