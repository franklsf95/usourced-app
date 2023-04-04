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
    <a href="#signup">
      <Box component="img" src="/assets/img/homepage-banner.gif" width="100%" />
    </a>
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
        {currentUser ? null : (
          <Box id="signup">
            <SignUpView />
          </Box>
        )}
      </main>
      <GlobalFooter />
    </ThemeProvider>
  );
};
