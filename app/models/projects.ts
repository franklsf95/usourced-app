export type ProjectStatus = string;

export type Project = {
  id: string;
  clientEmail: string;
  createdTime: string;
  inquiryDate: Date;
  projectImage: string;
  projectName: string;
  quantity: number;
  shipDate: Date;
  shippingMethod: string;
  shippingStatus: string;
  status: ProjectStatus;
  targetProductionCompletionDate: Date;
  targetSampleCompletionDate: Date;
  unitPrice: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseProject(data: any): Project {
  return {
    id: data.id,
    clientEmail: data.clientEmail,
    createdTime: data.createdTime,
    inquiryDate: new Date(data.inquiryDate),
    projectImage: data.projectImage,
    projectName: data.projectName,
    quantity: data.quantity,
    shipDate: new Date(data.shipDate),
    shippingMethod: data.shippingMethod,
    shippingStatus: data.shippingStatus,
    status: data.status,
    targetProductionCompletionDate: new Date(
      data.targetProductionCompletionDate,
    ),
    targetSampleCompletionDate: new Date(data.targetSampleCompletionDate),
    unitPrice: data.unitPrice,
  };
}
