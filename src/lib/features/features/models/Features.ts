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
  id: number;
  name: string;
  description: string;
  features: Feature[];
}

export interface PostFeatureRequest {
  name: string;
  description: string;
}
export interface PostFeatureResponse {
  id: string;

  name: string;
  description: string;
}
export interface PutFeatureRequest {
  id: number;

  name: string;
  description: string;
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
