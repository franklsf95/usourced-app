/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  CalendarMonth,
  DoubleArrow,
  FilterAlt,
  GridView,
  Search,
  ViewKanban,
} from "@mui/icons-material";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import pluralize from "pluralize";
import { usePageEffect } from "../../core/page.js";
import { useSnackBar } from "../../layout/components/SnackBarContext.js";
import {
  DemoProject,
  demo_project_groups,
} from "../../models/demo_projects.js";
import { ProjectStatus } from "../../models/projects.js";
import { AIChatDialog } from "./components/AIChatDialog.js";
import { ProjectCardView } from "./components/ProjectCardView.js";

function ProjectsKanbanColumnView({
  projectStatus,
  projects,
}: {
  projectStatus: ProjectStatus;
  projects: DemoProject[];
}): JSX.Element {
  const is_last_column = projectStatus === ProjectStatus.ProductionShipped;
  return (
    <Box sx={{ position: "relative", width: 240, mr: 4 }}>
      {!is_last_column && (
        <Box
          component="img"
          src="/projects/pink-arrow.svg"
          width={48}
          sx={{ my: 2, position: "absolute", top: 0, right: -40 }}
        />
      )}
      <Stack direction="column">
        <Box sx={{ textAlign: "center", height: 80 }}>
          <Typography variant="h2" fontSize={24} mx={4} mt={1}>
            {projectStatus}
          </Typography>
          <Typography
            variant="body1"
            color="#666666"
            fontSize={12}
            mx={1}
            mb={1}
          >
            {pluralize("project", projects.length, true)}
          </Typography>
        </Box>
        {projects.map((project) => (
          <Box key={project.id}>
            <ProjectCardView project={project} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function ProjectsKanbanView(): JSX.Element {
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

function ProjectsDashboardHeader(): JSX.Element {
  const { showDemoAlert } = useSnackBar();
  const buttonSx = { borderRadius: 6, fontSize: 13, letterSpacing: 0 };
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h1">Projects Dashboard</Typography>
      <ButtonGroup variant="outlined" size="small" sx={{ mt: 2 }}>
        <Button variant="contained" sx={buttonSx}>
          Views
        </Button>
        <Button startIcon={<GridView />} onClick={showDemoAlert} sx={buttonSx}>
          Grid
        </Button>
        <Button
          startIcon={<ViewKanban />}
          onClick={showDemoAlert}
          sx={buttonSx}
        >
          Kanban
        </Button>
        <Button
          startIcon={<CalendarMonth />}
          onClick={showDemoAlert}
          sx={buttonSx}
        >
          Calendar
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" size="small" sx={{ mt: 2, ml: 2 }}>
        <Button variant="contained" sx={buttonSx}>
          Tools
        </Button>
        <Button startIcon={<FilterAlt />} onClick={showDemoAlert} sx={buttonSx}>
          Filter
        </Button>
        <Button startIcon={<DoubleArrow />} sx={buttonSx}>
          Sort
        </Button>
        <Button startIcon={<Search />} onClick={showDemoAlert} sx={buttonSx}>
          Search
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default function DemoProjectsPage(): JSX.Element {
  usePageEffect({ title: "Projects Dashboard" });

  return (
    <Box component="main" sx={{ px: 8, py: 2 }}>
      <ProjectsDashboardHeader />
      <ProjectsKanbanView />
      <AIChatDialog />
    </Box>
  );
}
