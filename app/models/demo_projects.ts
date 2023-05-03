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
      projectName: "Beige Baseball Cap",
      inquiryDate: new Date("2023-01-03"),
      quantity: 500,
      projectStatus: ProjectStatus.SentQuotes,
    },
    {
      id: "2",
      projectName: "Blue Textured Notebook",
      inquiryDate: new Date("2023-01-03"),
      quantity: 500,
      projectStatus: ProjectStatus.SentQuotes,
    },
    {
      id: "3",
      projectName: "Yellow Backpack",
      inquiryDate: new Date("2023-01-03"),
      quantity: 1000,
      projectStatus: ProjectStatus.SentQuotes,
    },
  ],
  [ProjectStatus.InSampleProduction]: [
    {
      id: "4",
      projectName: "Colorful Packaging Box",
      inquiryDate: new Date("2022-10-12"),
      quantity: 1000,
      projectStatus: ProjectStatus.InSampleProduction,
    },
    {
      id: "5",
      projectName: "Fluffy White Cat Plushie",
      inquiryDate: new Date("2022-10-20"),
      quantity: 500,
      projectStatus: ProjectStatus.InSampleProduction,
    },
    {
      id: "6",
      projectName: "Green Desk Fan",
      inquiryDate: new Date("2022-10-29"),
      quantity: 1000,
      projectStatus: ProjectStatus.InSampleProduction,
    },
  ],
  [ProjectStatus.AdjustingSamples]: [
    {
      id: "7",
      projectName: "Lavender Phone Stand",
      inquiryDate: new Date("2022-12-02"),
      quantity: 500,
      projectStatus: ProjectStatus.AdjustingSamples,
    },
  ],
  [ProjectStatus.SampleShipped]: [
    {
      id: "8",
      projectName: "Orange Glass Water Bottle",
      inquiryDate: new Date("2022-11-02"),
      quantity: 500,
      projectStatus: ProjectStatus.SampleShipped,
    },
    {
      id: "9",
      projectName: "Pink Cloud Mug",
      inquiryDate: new Date("2022-11-03"),
      quantity: 500,
      projectStatus: ProjectStatus.SampleShipped,
    },
  ],
  [ProjectStatus.InBulkProduction]: [
    {
      id: "10",
      projectName: "Pink Fabric Pen Pouch",
      inquiryDate: new Date("2022-12-02"),
      quantity: 1000,
      projectStatus: ProjectStatus.InBulkProduction,
    },
    {
      id: "11",
      projectName: "Rose Gold Pen",
      inquiryDate: new Date("2022-10-12"),
      quantity: 500,
      projectStatus: ProjectStatus.InBulkProduction,
    },
    {
      id: "12",
      projectName: "Sapphire Blue Candle",
      inquiryDate: new Date("2023-01-02"),
      quantity: 500,
      projectStatus: ProjectStatus.InBulkProduction,
    },
  ],
  [ProjectStatus.ProductionShipped]: [
    {
      id: "13",
      projectName: "Teal Blue USB Charger Keychain",
      inquiryDate: new Date("2022-11-22"),
      quantity: 500,
      projectStatus: ProjectStatus.ProductionShipped,
    },
    {
      id: "14",
      projectName: "White V-Neck T-Shirt with Embroidered Flowers",
      inquiryDate: new Date("2022-11-22"),
      quantity: 500,
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

export const demo_projects_database: { [key: string]: DemoProject } =
  Object.assign(
    {},
    ...Object.values(demo_projects).map((projects) =>
      Object.assign(
        {},
        ...projects.map((project) => ({ [project.id]: project })),
      ),
    ),
  );
