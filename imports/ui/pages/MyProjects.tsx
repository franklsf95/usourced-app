import { Project, ProjectsCollection } from "/imports/api/projects";
import { HOME } from "/imports/ui/common/routes";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { currentUserEmail } from "../common/account_utils";
import { appTheme } from "../common/theme";
import { GlobalFooter } from "../components/GlobalFooter";
import { GlobalNavBar } from "../components/GlobalNavBar";
import { ProjectsKanbanView } from "../components/projects/ProjectsKanbanView";

const myProjectsSubscription = () => {
  const email = currentUserEmail();
  if (!email) {
    return { projects: [], isLoading: false };
  }
  const handler = Meteor.subscribe("my_projects");
  if (!handler.ready()) {
    return { projects: [], isLoading: true };
  }
  const projects = ProjectsCollection.find({
    // clientEmail: email,
  }).fetch();
  return { projects, isLoading: false };
};

export const MyProjects = () => {
  useEffect(() => {
    document.title = "My Projects | USourced";
  }, []);
  const { projects, isLoading } = useTracker(myProjectsSubscription);
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <GlobalNavBar />
      <main>
        <Container maxWidth="sm" sx={{ my: 6 }}>
          <Typography component="h1" variant="h3" align="center">
            My Projects
          </Typography>
        </Container>
        <ProjectsKanbanView projects={projects} isLoading={isLoading} />
      </main>
      <GlobalFooter />
    </ThemeProvider>
  );
};
