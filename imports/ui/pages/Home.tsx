import "../../api/task_methods";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { appTheme } from "../common/theme";
import { GlobalFooter } from "../components/GlobalFooter";
import { GlobalNavBar } from "../components/GlobalNavBar";
import { SignUpView } from "../components/home/SignUpView";

const HeroView = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom>
          USourced
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center">
          <Button variant="contained" color="secondary" href="#signup">
            Try it now!
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export const Home = () => {
  const currentUser = useTracker(() => Meteor.user());
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <GlobalNavBar />
      <main>
        <HeroView />
        {currentUser ? null : <SignUpView />}
      </main>
      <GlobalFooter />
    </ThemeProvider>
  );
};
