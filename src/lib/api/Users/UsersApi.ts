import { GetUserDto, PostUserRequest, PostUserResponse, PutUserResponse } from "@/lib/features/users/models/Users";


export class UsersApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUsers(): Promise<GetUserDto[]> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
    return response.json();
  }

  async getUserById(userId: string): Promise<GetUserDto> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }

    return response.json();
  }

  async createUser(userData: PostUserRequest): Promise<PostUserResponse> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Error creating user: ${response.statusText}`);
    }
    return response.json();
  }

  async updateUser(
    userId: string,
    userData: any
  ): Promise<PutUserResponse> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Error updating user: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteUser(userId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting user: ${response.statusText}`);
    }
  }
}
