import { ProjectStatus } from "./projects.js";

export type DemoProject = {
  id: string;
  projectName: string;
  inquiryDate: Date;
  quantity: number;
  projectStatus: ProjectStatus;
};

export type DemoProjectGroup = {
  projectStatus: ProjectStatus;
  projects: DemoProject[];
};

export const demo_projects: { [key in ProjectStatus]: DemoProject[] } = {
  [ProjectStatus.SentQuotes]: [
    {
      id: "1",
      projectName: "Rainbow Pom Headband",
      inquiryDate: new Date("2023-01-03"),
      quantity: 500,
      projectStatus: ProjectStatus.SentQuotes,
    },
    {
      id: "2",
      projectName: "Heart-Shape Coil Bracelet",
      inquiryDate: new Date("2023-01-03"),
      quantity: 500,
      projectStatus: ProjectStatus.SentQuotes,
    },
    {
      id: "3",
      projectName: "Junkfood Mini Backpack",
      inquiryDate: new Date("2023-01-03"),
      quantity: 1000,
      projectStatus: ProjectStatus.SentQuotes,
    },
  ],
  [ProjectStatus.InSampleProduction]: [
    {
      id: "4",
      projectName: "Furry Diary with Lock",
      inquiryDate: new Date("2022-10-12"),
      quantity: 1000,
      projectStatus: ProjectStatus.InSampleProduction,
    },
    {
      id: "5",
      projectName: "Stay Cool Tank Top",
      inquiryDate: new Date("2022-10-20"),
      quantity: 500,
      projectStatus: ProjectStatus.InSampleProduction,
    },
    {
      id: "6",
      projectName: "Furry Eyemask",
      inquiryDate: new Date("2022-10-29"),
      quantity: 1000,
      projectStatus: ProjectStatus.InSampleProduction,
    },
  ],
  [ProjectStatus.AdjustingSamples]: [
    {
      id: "7",
      projectName: "Flower Earrings",
      inquiryDate: new Date("2022-12-02"),
      quantity: 500,
      projectStatus: ProjectStatus.AdjustingSamples,
    },
  ],
  [ProjectStatus.SampleShipped]: [
    {
      id: "8",
      projectName: "Furry Fanny Pack",
      inquiryDate: new Date("2022-11-02"),
      quantity: 500,
      projectStatus: ProjectStatus.SampleShipped,
    },
    {
      id: "9",
      projectName: "Furry Ball Heart Keychain",
      inquiryDate: new Date("2022-11-03"),
      quantity: 500,
      projectStatus: ProjectStatus.SampleShipped,
    },
  ],
  [ProjectStatus.InBulkProduction]: [
    {
      id: "10",
      projectName: "Heart Pattern Headband",
      inquiryDate: new Date("2022-12-02"),
      quantity: 1000,
      projectStatus: ProjectStatus.InBulkProduction,
    },
    {
      id: "11",
      projectName: "Vegan Leather Backpack",
      inquiryDate: new Date("2022-10-12"),
      quantity: 500,
      projectStatus: ProjectStatus.InBulkProduction,
    },
    {
      id: "12",
      projectName: "Enamel Pin Set",
      inquiryDate: new Date("2023-01-02"),
      quantity: 500,
      projectStatus: ProjectStatus.InBulkProduction,
    },
  ],
  [ProjectStatus.ProductionShipped]: [
    {
      id: "13",
      projectName: "Walkie Talkie Set",
      inquiryDate: new Date("2022-11-22"),
      quantity: 500,
      projectStatus: ProjectStatus.ProductionShipped,
    },
    {
      id: "14",
      projectName: "Colorful Silk Scrunchies",
      inquiryDate: new Date("2022-11-22"),
      quantity: 500,
      projectStatus: ProjectStatus.ProductionShipped,
    },
    {
      id: "15",
      projectName: "Rainbow Bling Keychain",
      inquiryDate: new Date("2022-10-02"),
      quantity: 1000,
      projectStatus: ProjectStatus.ProductionShipped,
    },
  ],
};

export const demo_project_groups: DemoProjectGroup[] = Object.values(
  ProjectStatus,
).map((projectStatus) => ({
  projectStatus,
  projects: demo_projects[projectStatus],
}));
