import { HOME } from "/imports/ui/common/routes";
import { Meteor } from "meteor/meteor";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { HOME_SIGN_UP, MY_PROJECTS, SIGN_IN } from "../common/routes";

const NavBarButtonsForUser = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Meteor.logout();
    navigate(HOME);
  };
  return (
    <>
      <Button href={MY_PROJECTS}>My Projects</Button>
      <Button onClick={handleLogout}>Log Out</Button>
    </>
  );
};

const NavBarButtonsForGuest = () => {
  return (
    <>
      <Button href={SIGN_IN}>Log In</Button>
      <Button href={HOME_SIGN_UP}>Sign Up</Button>
    </>
  );
};

export const GlobalNavBar = () => {
  const currentUser = Meteor.user();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            USourced
          </Typography>
          {currentUser ? NavBarButtonsForUser() : NavBarButtonsForGuest()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
