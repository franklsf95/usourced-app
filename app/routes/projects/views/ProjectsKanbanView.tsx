import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
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
        width: 220,
        mx: "auto",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={project.projectImage}
          alt={project.projectName}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6">
            {project.projectName}
          </Typography>
          <Typography>Started on {project.inquiryDate}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            sx={{ fontSize: 14 }}
            href={`/projects/${project.id}`}
          >
            Open Project
          </Button>
        </CardActions>
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
        elevation={3}
        sx={{
          width: 240,
          backgroundColor: "#f8f8f8",
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
            <ProjectCardView project={project} />
          </Box>
        ))}
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
}
