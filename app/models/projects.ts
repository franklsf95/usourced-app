export type ProjectStatus = string;

export interface Project {
  id: string;
  clientEmail: string;
  createdTime: string;
  estimatedDeliveryDate: string;
  inquiryDate: string;
  projectImage: string;
  projectName: string;
  quantity: number;
  shipDate: string;
  shippingMethod: string;
  shippingStatus: string;
  status: ProjectStatus;
  targetProductionCompletionDate: string;
  targetSampleCompletionDate: string;
  unitPrice: number;
}
