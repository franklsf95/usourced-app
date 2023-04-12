/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CircularProgress, Container, Typography } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { selector, useRecoilValue } from "recoil";
import { CurrentUserAuthHeader } from "../../core/auth.js";
import { usePageEffect } from "../../core/page.js";
import { Project } from "../../models/projects.js";
import { ProjectsKanbanView } from "./views/ProjectsKanbanView.js";

const MyProjectsQuery = selector<Project[]>({
  key: "MyProjectsQuery",
  get: async ({ get }) => {
    const auth_header = await CurrentUserAuthHeader(get);
    const res = await axios.get("/projects", auth_header).catch((err) => {
      throw err;
    });
    const { projects } = res.data;
    return projects;
  },
});

export default function MyProjects(): JSX.Element {
  usePageEffect({ title: "My Projects" });

  const projects = useRecoilValue(MyProjectsQuery);

  return (
    <Container>
      <Typography variant="h1" align="center" sx={{ my: 6 }}>
        My Projects
      </Typography>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <React.Suspense fallback={<CircularProgress />}>
          <ProjectsKanbanView projects={projects} />
        </React.Suspense>
      </ErrorBoundary>
    </Container>
  );
}
