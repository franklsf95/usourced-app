/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { FolderOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
} from "@mui/material";
import * as React from "react";
import { RouterLink } from "../../common/RouterLink.js";
import { useCurrentUser } from "../../core/auth.js";
import { UserMenu } from "./UserMenu.js";

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    background: true;
  }
}

export function DemoToolbar(props: AppToolbarProps): JSX.Element {
  const { sx, ...other } = props;
  const menuAnchorRef = React.createRef<HTMLButtonElement>();
  const me = useCurrentUser();

  const [anchorEl, setAnchorEl] = React.useState({
    userMenu: null as HTMLElement | null,
    notifications: null as HTMLElement | null,
  });

  function openUserMenu() {
    setAnchorEl((x) => ({ ...x, userMenu: menuAnchorRef.current }));
  }

  function closeUserMenu() {
    setAnchorEl((x) => ({ ...x, userMenu: null }));
  }

  const buttonSx = {
    fontWeight: 300,
    textTransform: "uppercase",
    px: 4,
    mr: 4,
  };

  return (
    <AppBar
      sx={{
        borderBottom: "1px #183439 solid",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ...sx,
      }}
      color="background"
      elevation={0}
      {...other}
    >
      <Toolbar sx={{ mx: 8, height: 100, mt: 1 }}>
        <Link color="inherit" underline="none" href="/" component={RouterLink}>
          <Box component="img" src="/usourced-logo.png" height={56} />
        </Link>
        <span style={{ flexGrow: 1 }} />
        <Button
          component={RouterLink}
          href="/custom-request"
          variant="text"
          color="inherit"
          children="Custom Request"
          sx={buttonSx}
        />
        <Button
          component={RouterLink}
          href="/product/1"
          variant="text"
          color="inherit"
          children="Product Catalog Demo"
          sx={buttonSx}
        />
        <Button
          component={RouterLink}
          href="/ai-designer"
          variant="text"
          color="inherit"
          children="USourced AI Demo"
          sx={buttonSx}
        />
        <Button
          component={RouterLink}
          href="/projects"
          variant="text"
          color="inherit"
          children="Client Dashboard Demo"
          sx={buttonSx}
        />
        {/* Navigation links for signed-in users */}
        {me && (
          <Button
            component={RouterLink}
            variant="text"
            href="/projects"
            color="inherit"
            children="Cart"
            startIcon={<ShoppingCartOutlined />}
            sx={{ mr: 2, width: 180 }}
          />
        )}
        {me && (
          <Button
            component={RouterLink}
            variant="text"
            href="/projects"
            color="inherit"
            children="Projects"
            startIcon={<FolderOutlined />}
            sx={{ mr: 2, width: 180 }}
          />
        )}
        {/* Account related controls (icon buttons) */}
        {me && (
          <IconButton
            ref={menuAnchorRef}
            sx={{
              ml: 1,
              backgroundColor: (x) =>
                x.palette.mode === "light"
                  ? x.palette.grey[100]
                  : x.palette.grey[700],
              width: 40,
              height: 40,
            }}
            onClick={openUserMenu}
          >
            <Avatar
              alt={me?.displayName || (me?.isAnonymous ? "Anonymous" : "")}
              src={me?.photoURL || undefined}
            />
          </IconButton>
        )}
        {me === null && (
          <Button
            component={RouterLink}
            variant="outlined"
            href="/login"
            color="inherit"
            children="SIGN IN"
            sx={{ ml: 2 }}
          />
        )}
      </Toolbar>

      {/* Pop-up menus */}

      <UserMenu
        anchorEl={anchorEl.userMenu}
        onClose={closeUserMenu}
        PaperProps={{ sx: { marginTop: "8px" } }}
      />
    </AppBar>
  );
}

type AppToolbarProps = Omit<AppBarProps, "children">;
