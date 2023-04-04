import { HOME } from "/imports/ui/common/routes";
import { Meteor } from "meteor/meteor";
import * as React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

import { HOME_SIGN_UP, MY_PROJECTS, SIGN_IN } from "../common/routes";

const NavBarButtonsForUser = (navigate: NavigateFunction) => {
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
      <Button href={HOME_SIGN_UP}>Sign Up</Button>
      <Button href={SIGN_IN}>Log In</Button>
    </>
  );
};

export const GlobalNavBar = () => {
  const navigate = useNavigate();
  const currentUser = Meteor.user();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              component="img"
              src="/assets/img/usourced-logo.png"
              height={44}
            />
          </Box>
          {currentUser
            ? NavBarButtonsForUser(navigate)
            : NavBarButtonsForGuest()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
