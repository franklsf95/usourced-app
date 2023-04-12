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
import { Project, ProjectStatus } from "../../../models/projects.js";

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

function ProjectCardView({ project }: { project: Project }): JSX.Element {
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
          image={project.projectImage}
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
  projects: Project[];
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
        {projects.map((project: Project) => (
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

export interface ProjectsKanbanViewProps {
  projects: Project[];
}

export function ProjectsKanbanView({
  projects,
}: ProjectsKanbanViewProps): JSX.Element {
  const projectGroups = getProjectGroups(projects);
  return (
    <Container>
      <Box sx={{ height: "75vh", overflow: "scroll" }}>
        <Box sx={{ width: 2400, display: "flex" }}>
          {[...projectGroups.entries()].map(([status, projects], i) => (
            <ProjectsKanbanColumnView
              key={i}
              projectStatus={status}
              projects={projects}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
