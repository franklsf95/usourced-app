/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  FolderOutlined,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Link,
  Toolbar,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { RouterLink } from "../../common/RouterLink.js";
import { useCurrentUser } from "../../core/auth.js";
import { UserMenu } from "./UserMenu.js";

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    background: true;
  }
}

const SearchSection = styled("div")(({ theme }) => ({
  position: "relative",
  flexGrow: 1,
  marginLeft: theme.spacing(8),
  marginRight: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
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
  border: "1px solid #183439",
  borderRadius: 16,
  fontSize: 14,
  height: "2.4em",
  width: 800,
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

  function openUserMenu() {
    setAnchorEl((x) => ({ ...x, userMenu: menuAnchorRef.current }));
  }

  function closeUserMenu() {
    setAnchorEl((x) => ({ ...x, userMenu: null }));
  }

  return (
    <AppBar
      sx={{
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
        <SearchSection>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search products..." />
        </SearchSection>
        {/* <span style={{ flexGrow: 1 }} /> */}
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
