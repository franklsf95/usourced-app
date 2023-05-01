/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import pluralize from "pluralize";
import { usePageEffect } from "../../core/page.js";
import {
  DemoProject,
  demo_project_groups,
} from "../../models/demo_projects.js";
import { ProjectStatus } from "../../models/projects.js";

function ProjectCardView({ project }: { project: DemoProject }): JSX.Element {
  const projectImage = "/home/1.png";
  return (
    <Card
      sx={{
        width: 240,
        mx: "auto",
        my: 1,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={projectImage}
          alt={project.projectName}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h3">
            {project.projectName}
          </Typography>
          <Typography variant="body1" fontSize={12}>
            Inquired on {project.inquiryDate.toLocaleDateString()}
          </Typography>
          {/* <Typography variant="body1" fontSize={12}>
            Estimated Delivery on{" "}
            {project.estimatedDeliveryDate.toLocaleDateString()}
          </Typography> */}
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
      <Paper
        elevation={1}
        sx={{
          width: 240,
          backgroundColor: "#f0f0f0",
          py: 1,
        }}
      >
        <Chip
          label={
            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
              {projectStatus}
            </Typography>
          }
          sx={{
            mx: 1,
            mt: 1,
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
          }}
        />
        {projects.map((project) => (
          <Box key={project.id}>
            <ProjectCardView project={project} />
          </Box>
        ))}
        <Typography variant="body1" color="#666666" fontSize={11} mx={1} mt={2}>
          Total {pluralize("project", projects.length, true)}
        </Typography>
      </Paper>
    </Stack>
  );
}

export function ProjectsKanbanView(): JSX.Element {
  return (
    <Container>
      <Box sx={{ height: "75vh", overflow: "scroll" }}>
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
    </Container>
  );
}

function ProjectStatusCategoriesBar(): JSX.Element {
  return (
    <Box sx={{ width: 2400, height: 200, border: "1px solid #ccc" }}></Box>
  );
}

function ProjectsChatView(): JSX.Element {
  return (
    <Box sx={{ width: 400, height: "75vh", border: "1px solid #ccc" }}></Box>
  );
}

function MyProjectsView(): JSX.Element {
  return (
    <>
      <ProjectStatusCategoriesBar />
      <ProjectsKanbanView />
      <ProjectsChatView />
    </>
  );
}

export default function DemoProjectsPage(): JSX.Element {
  usePageEffect({ title: "My Projects" });

  return (
    <Container component="main">
      <MyProjectsView />
    </Container>
  );
}
