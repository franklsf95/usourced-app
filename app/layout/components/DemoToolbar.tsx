/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ArrowDropDown, NotificationsNone, Search } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  Avatar,
  Button,
  IconButton,
  InputBase,
  Link,
  Toolbar,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { Link as NavLink } from "../../common/Link.js";
import { useCurrentUser } from "../../core/auth.js";
import { Logo } from "./Logo.js";
import { NotificationsMenu } from "./NotificationsMenu.js";
import { UserMenu } from "./UserMenu.js";

const SearchSection = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.5,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function DemoToolbar(props: AppToolbarProps): JSX.Element {
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
        <SearchSection sx={{ flexGrow: 1, mx: 8 }}>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </SearchSection>
        {/* <span style={{ flexGrow: 1 }} /> */}
        {/* Navigation links for signed-in users */}
        {me && (
          <Button
            component={NavLink}
            variant="outlined"
            href="/projects"
            color="inherit"
            children="My Projects"
            sx={{ mr: 2 }}
          />
        )}
        {/* {me && (
          <Button
            component={NavLink}
            variant="outlined"
            href="/projects/new"
            color="inherit"
            children="New Request"
            sx={{ mr: 2 }}
          />
        )} */}
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
