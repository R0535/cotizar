interface Feature {
  id: string;
  label: string;
  description: string;
  timeBack: number;
  timeFront: number;
  color: string;
  previews: string;
  tags: string[];
  featureId: number;

}

export interface GetFeatureDto {
  id: string;
  label: string;
  description: string;
  features: Feature[];
  timeBack: number;
  timeFront: number;
  previews: string;
  color : string;
  sectionId: number;
  tags: string;
}

export interface PostFeatureRequest {
  label: string;
  description: string;
  color: string;
  timeBack: number;
  timeFront: number;
  tags: string;
  sectionId: number;
  preview: string;
  
}
export interface PostFeatureResponse {
  id: string;

  name: string;
  description: string;
}
export interface PutFeatureRequest {
  id: string;

  label: string;
  description: string;

  color: string;
  timeBack: number;
  timeFront: number;
  tags: string;
  sectionId: number;
  preview: string;

}
export interface PutFeatureResponse {

  name: string;
  description: string;
}

export interface DeleteFeatureRequest {
  id: string;
}
export interface DeleteFeatureResponse {
  id: string;
}
