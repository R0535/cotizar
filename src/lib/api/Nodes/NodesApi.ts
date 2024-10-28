


export class NodesApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getNodes(): Promise<[]> {
    const response = await fetch(`${this.baseUrl}/nodes`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching nodes: ${response.statusText}`);
    }
    return response.json();
  }

  async getNodeById(nodeId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/nodes/${nodeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching node: ${response.statusText}`);
    }

    return response.json();
  }

  async createNode(nodeData: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/nodes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nodeData),
    });

    if (!response.ok) {
      throw new Error(`Error creating node: ${response.statusText}`);
    }
    return response.json();
  }

  async updateNode(
    nodeId: string,
    nodeData: any
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}/nodes/${nodeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nodeData),
    });

    if (!response.ok) {
      throw new Error(`Error updating node: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteNode(nodeId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/nodes/${nodeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting node: ${response.statusText}`);
    }
  }
}
