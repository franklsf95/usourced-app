import { HOME } from "/imports/ui/common/routes";
import { Meteor } from "meteor/meteor";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { HOME_SIGN_UP, SIGN_IN } from "../common/routes";

const getNavBarButtonsForGuest = () => {
  return (
    <>
      <Button color="inherit" href={SIGN_IN}>
        Log In
      </Button>
      <Button color="inherit" href={HOME_SIGN_UP}>
        Sign Up
      </Button>
    </>
  );
};

export const GlobalNavBar = () => {
  const navigate = useNavigate();
  const currentUser = Meteor.user();
  const handleLogout = () => {
    Meteor.logout();
    navigate(HOME);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            USourced
          </Typography>
          {currentUser ? (
            <Button color="inherit" onClick={handleLogout}>
              Log Out {currentUser ? currentUser.username : ""}
            </Button>
          ) : (
            getNavBarButtonsForGuest()
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
