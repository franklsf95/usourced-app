/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Close } from "@mui/icons-material";
import { AppBar, AppBarProps, Box, IconButton, Toolbar } from "@mui/material";
import { RouterLink } from "../../common/RouterLink.js";
import { Logo } from "./Logo.js";

export function BaseToolbar(props: AppBarProps): JSX.Element {
  return (
    <AppBar color="transparent" elevation={0} {...props}>
      <Toolbar>
        {/* Name / Logo */}
        <Box
          sx={{ textDecoration: "none", color: "inherit" }}
          component={RouterLink}
          children={<Logo />}
          href="/"
        />

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} component="span" />

        {/* Close button */}
        <IconButton component={RouterLink} href="/">
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
