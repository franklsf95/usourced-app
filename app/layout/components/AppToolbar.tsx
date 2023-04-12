/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ArrowDropDown, NotificationsNone } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  Avatar,
  Button,
  IconButton,
  Link,
  Toolbar,
} from "@mui/material";
import * as React from "react";
import { Link as NavLink } from "../../common/Link.js";
import { useCurrentUser } from "../../core/auth.js";
import { Logo } from "./Logo.js";
import { NotificationsMenu } from "./NotificationsMenu.js";
import { UserMenu } from "./UserMenu.js";

export function AppToolbar(props: AppToolbarProps): JSX.Element {
  const { sx, ...other } = props;
  const menuAnchorRef = React.createRef<HTMLButtonElement>();
  const me = useCurrentUser();

  const [anchorEl, setAnchorEl] = React.useState({
    userMenu: null as HTMLElement | null,
    notifications: null as HTMLElement | null,
  });

  function openNotificationsMenu() {
    setAnchorEl((x) => ({ ...x, notifications: menuAnchorRef.current }));
  }

  function closeNotificationsMenu() {
    setAnchorEl((x) => ({ ...x, notifications: null }));
  }

  function openUserMenu() {
    setAnchorEl((x) => ({ ...x, userMenu: menuAnchorRef.current }));
  }

  function closeUserMenu() {
    setAnchorEl((x) => ({ ...x, userMenu: null }));
  }

  return (
    <AppBar
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, ...sx }}
      color="secondary"
      elevation={0}
      {...other}
    >
      <Toolbar>
        <Link color="inherit" underline="none" href="/" component={NavLink}>
          <Logo />
        </Link>
        <span style={{ flexGrow: 1 }} />
        {/* Navigation links for signed-in users */}
        {me && (
          <Button
            component={NavLink}
            href="/projects"
            color="inherit"
            children="My Projects"
            sx={{ mr: 2 }}
          />
        )}
        {me && (
          <Button
            component={NavLink}
            variant="outlined"
            href="/"
            color="inherit"
            children="New Request"
            sx={{ mr: 2 }}
          />
        )}
        {/* Account related controls (icon buttons) */}
        {me && (
          <NavLink href="/settings/account">
            <Avatar
              alt={me?.displayName || (me?.isAnonymous ? "Anonymous" : "")}
              src={me?.photoURL || undefined}
              sx={{ ml: 2 }}
            />
          </NavLink>
        )}
        {me && (
          <IconButton
            sx={{
              ml: 1,
              backgroundColor: (x) =>
                x.palette.mode === "light"
                  ? x.palette.grey[100]
                  : x.palette.grey[700],
              width: 40,
              height: 40,
            }}
            children={<NotificationsNone />}
            onClick={openNotificationsMenu}
          />
        )}
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
            children={<ArrowDropDown />}
            onClick={openUserMenu}
          />
        )}
        {me === null && (
          <Button
            component={NavLink}
            variant="outlined"
            href="/login"
            color="inherit"
            children="SIGN IN"
            sx={{ ml: 2 }}
          />
        )}
      </Toolbar>

      {/* Pop-up menus */}

      <NotificationsMenu
        anchorEl={anchorEl.notifications}
        onClose={closeNotificationsMenu}
        PaperProps={{ sx: { marginTop: "8px" } }}
      />
      <UserMenu
        anchorEl={anchorEl.userMenu}
        onClose={closeUserMenu}
        PaperProps={{ sx: { marginTop: "8px" } }}
      />
    </AppBar>
  );
}

type AppToolbarProps = Omit<AppBarProps, "children">;
