import { Project, ProjectStatus } from "/imports/api/projects";
import { HOME } from "/imports/ui/common/routes";
import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface ProjectsKanbanViewProps {
  projects: Project[];
  isLoading: boolean;
}

function getProjectGroups(projects: Project[]): Map<ProjectStatus, Project[]> {
  const ret = new Map();
  projects.forEach((item) => {
    const key = item.status;
    const col = ret.get(key);
    if (!col) {
      ret.set(key, [item]);
    } else {
      col.push(item);
    }
  });
  return ret;
}

const ProjectsKanbanColumnView = ({
  projectStatus,
  projects,
}: {
  projectStatus: ProjectStatus;
  projects: Project[];
}) => {
  return (
    <Stack sx={{ mx: 1 }} direction="column">
      <Paper
        elevation={3}
        sx={{
          width: 240,
          backgroundColor: "#f8f8f8",
        }}>
        <Chip
          label={
            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
              {projectStatus}
            </Typography>
          }
          sx={{
            mx: 1,
            my: 2,
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
          }}
        />
        {projects.map((project: Project) => (
          <Box key={project.id}>
            <Card
              sx={{
                width: 220,
                mx: "auto",
              }}>
              <CardActionArea href={HOME}>
                <CardMedia
                  component="img"
                  image={project.projectImage}
                  alt={project.projectName}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6">
                    {project.projectName}
                  </Typography>
                  <Typography>
                    Started on {project.inquiryDate.toDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="outlined" sx={{ fontSize: 14 }}>
                    Open Project
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Paper>
    </Stack>
  );
};

export const ProjectsKanbanView = ({
  projects,
  isLoading,
}: ProjectsKanbanViewProps) => {
  const projectGroups = getProjectGroups(projects);
  return (
    <Container>
      <Paper elevation={1} sx={{ overflow: "scroll" }}>
        <Box sx={{ width: 2400, display: "flex" }}>
          {[...projectGroups.entries()].map(([status, projects], i) => (
            <ProjectsKanbanColumnView
              key={i}
              projectStatus={status}
              projects={projects}
            />
          ))}
        </Box>
      </Paper>
    </Container>
  );
};
