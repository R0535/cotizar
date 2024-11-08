interface Feature {
  id: string;
  label: string;
  description: string;
  timeBack: number;
  timeFront: number;
  color: string;
  previews: string;
  tags: string[];
  sectionId: number;

}

export interface GetSectionDto {
  id: number;
  name: string;
  description: string;
  features: Feature[];
}
export interface GetSectionEnum {
  id: number;
  name: string;
}
export interface PostSectionRequest {
  name: string;
  description: string;
}
export interface PostSectionResponse {
  id: string;

  name: string;
  description: string;
}
export interface PutSectionRequest {
  id: number;

  name: string;
  description: string;
}
export interface PutSectionResponse {

  name: string;
  description: string;
}

export interface DeleteSectionRequest {
  id: string;
}
export interface DeleteSectionResponse {
  id: string;
}
