/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Alert,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { selector, useRecoilValue } from "recoil";
import { CurrentUserAuthHeader } from "../../core/auth.js";
import { usePageEffect } from "../../core/page.js";
import { Project, parseProject } from "../../models/projects.js";
import { ProjectsKanbanView } from "./views/ProjectsKanbanView.js";

const MyProjectsQuery = selector<Project[]>({
  key: "MyProjectsQuery",
  get: async ({ get }) => {
    const auth_header = await CurrentUserAuthHeader(get);
    const res = await axios.get("/projects", auth_header).catch((err) => {
      throw err;
    });
    return res.data.projects.map(parseProject);
  },
});

function MyProjectsView(): JSX.Element {
  const projects = useRecoilValue(MyProjectsQuery);
  return <ProjectsKanbanView projects={projects} />;
}

function LoadingView(): JSX.Element {
  return (
    <Stack alignItems="center">
      <CircularProgress />
    </Stack>
  );
}

function ErrorView({ error }: { error: Error }): JSX.Element {
  return (
    <Container maxWidth="sm">
      <Alert severity="error">{error.message}</Alert>
    </Container>
  );
}

export default function MyProjectsPage(): JSX.Element {
  usePageEffect({ title: "My Projects" });

  return (
    <Container>
      <Typography variant="h1" align="center" sx={{ mt: 4, mb: 4 }}>
        My Projects
      </Typography>
      <ErrorBoundary FallbackComponent={ErrorView}>
        <React.Suspense fallback={<LoadingView />}>
          <MyProjectsView />
        </React.Suspense>
      </ErrorBoundary>
    </Container>
  );
}
