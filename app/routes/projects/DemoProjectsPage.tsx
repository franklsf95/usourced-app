/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import pluralize from "pluralize";
import { RouterLink } from "../../common/RouterLink.js";
import { useFirestoreImage } from "../../core/firebase_utils.js";
import { usePageEffect } from "../../core/page.js";
import {
  DemoProject,
  demo_project_groups,
} from "../../models/demo_projects.js";
import { ProjectStatus } from "../../models/projects.js";

const DEFAULT_PROJECT_IMAGE_URL = "/home/box-silhouette.png";

function ProjectCardView({ project }: { project: DemoProject }): JSX.Element {
  const { image } = useFirestoreImage({
    path: `/usourced/demo/projects/${project.projectName}.png`,
  });
  return (
    <Card
      sx={{
        width: 240,
        mx: "auto",
        my: 1,
      }}
    >
      <CardActionArea component={RouterLink} href="/projects/1">
        <CardMedia
          component="img"
          image={image ?? DEFAULT_PROJECT_IMAGE_URL}
          alt={project.projectName}
          sx={{ p: 2, height: 200, objectFit: "contain" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h3" fontSize={16} fontWeight={600}>
            {project.projectName}
          </Typography>
          <Typography variant="body1" fontSize={14}>
            Inquired on {project.inquiryDate.toLocaleDateString()}
          </Typography>
          <Typography variant="body1" fontSize={14}>
            Quantity: {project.quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function ProjectsKanbanColumnView({
  projectStatus,
  projects,
}: {
  projectStatus: ProjectStatus;
  projects: DemoProject[];
}): JSX.Element {
  return (
    <Stack sx={{ mx: 1 }} direction="column">
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" fontSize={20} mx={2} mt={1}>
          {projectStatus}
        </Typography>
        <Typography variant="body1" color="#666666" fontSize={12} mx={1} mb={1}>
          {pluralize("project", projects.length, true)}
        </Typography>
      </Box>
      {projects.map((project) => (
        <Box key={project.id}>
          <ProjectCardView project={project} />
        </Box>
      ))}
    </Stack>
  );
}

export function ProjectsKanbanView(): JSX.Element {
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        {demo_project_groups.map(({ projectStatus, projects }) => (
          <ProjectsKanbanColumnView
            key={projectStatus}
            projectStatus={projectStatus}
            projects={projects}
          />
        ))}
      </Box>
    </Box>
  );
}

function ProjectsChatView(): JSX.Element {
  return (
    <Box sx={{ width: 400, height: "75vh", border: "1px solid #ccc" }}></Box>
  );
}

export default function DemoProjectsPage(): JSX.Element {
  usePageEffect({ title: "My Projects" });

  return (
    <Box component="main" sx={{ px: 8, py: 2 }}>
      <ProjectsKanbanView />
      {/* <ProjectsChatView /> */}
    </Box>
  );
}
