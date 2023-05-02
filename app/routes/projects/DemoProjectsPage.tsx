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
import { getDownloadURL, ref } from "firebase/storage";
import pluralize from "pluralize";
import * as React from "react";
import { storage } from "../../core/firebase.js";
import { usePageEffect } from "../../core/page.js";
import {
  DemoProject,
  demo_project_groups,
} from "../../models/demo_projects.js";
import { ProjectStatus } from "../../models/projects.js";

const DEFAULT_PROJECT_IMAGE_URL = "/home/box-silhouette.png";

async function fetchProjectImageUrl(
  project: DemoProject,
): Promise<string | null> {
  const path = `/usourced/demo/projects/${project.projectName}.png`;
  try {
    return await getDownloadURL(ref(storage, path));
  } catch (e) {
    return null;
  }
}

function ProjectCardView({ project }: { project: DemoProject }): JSX.Element {
  const [imageUrl, setImageUrl] = React.useState<string>(
    DEFAULT_PROJECT_IMAGE_URL,
  );
  React.useEffect(() => {
    async function effect() {
      const url = await fetchProjectImageUrl(project);
      if (url) {
        setImageUrl(url);
      }
    }
    effect();
  }, [project]);
  return (
    <Card
      sx={{
        width: 240,
        mx: "auto",
        my: 1,
      }}
    >
      <CardActionArea>
        <CardMedia component="img" image={imageUrl} alt={project.projectName} />
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
      <Box sx={{ width: 2400, display: "flex" }}>
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
