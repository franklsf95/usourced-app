import "../../api/task_methods";

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

import { appTheme } from "../common/theme";
import { GlobalFooter } from "../components/GlobalFooter";
import { GlobalNavBar } from "../components/GlobalNavBar";

export const MyProjects = () => {
  useEffect(() => {
    document.title = "My Projects | USourced";
  }, []);
  const { projects, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe("my_projects");
    if (!handler.ready()) {
      return { projects: [], isLoading: true };
    }
    const projects = ProjectsCollection.find({}).fetch();
    return { projects, isLoading: false };
  });
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
        <Container sx={{ py: 0 }} maxWidth="md">
          <Grid container spacing={4}>
            {projects.map((project: Project) => (
              <Grid item key={project.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <CardActionArea href={HOME}>
                    <CardMedia
                      component="img"
                      image={project.projectImage}
                      alt={project.projectName}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {project.projectName}
                      </Typography>
                      <Typography>
                        Started on {project.inquiryDate.toDateString()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Open Project</Button>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <GlobalFooter />
    </ThemeProvider>
  );
};
