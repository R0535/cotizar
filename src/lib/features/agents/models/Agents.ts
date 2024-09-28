export interface GetAgentDto{
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    createdOn: string;
    updatedOn: string;
}

export interface PostAgentRequest{
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;

}
export interface PostAgentResponse{
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    createdOn: string;
    updatedOn: string;

    }
export interface PutAgentRequest{
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;

        
    }
export interface PutAgentResponse{
                id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    }
export interface DeleteAgentRequest{
                id: string;
    }
export interface DeleteAgentResponse{
           id: string;         
    }


