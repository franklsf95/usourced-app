import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Meteor } from "meteor/meteor";
import { SIGN_IN } from "../common/routes";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ROOT } from "/imports/ui/common/routes";

export const GlobalNavBar = () => {
  const navigate = useNavigate();
  const currentUser = Meteor.user();
  const handleLogout = () => {
    Meteor.logout();
    navigate(ROOT);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            USourced
          </Typography>
          {currentUser ? (
            <Button color="inherit" onClick={handleLogout}>
              Log Out {currentUser ? currentUser.username : ""}
            </Button>
          ) : (
            <Button color="inherit" href={SIGN_IN}>
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
