/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { AppBar, AppBarProps, Button, InputBase, Toolbar } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    background: true;
  }
}

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

export function DemoNavigationBar(props: AppToolbarProps): JSX.Element {
  const { sx, ...other } = props;

  const categories = [
    "Shop All",
    "New Arrivals",
    "Tech & Gadgets",
    "Office & School",
    "Home & Living",
    "Apparel & Accessories",
    "Stickers & Prints",
    "Packaging & Shipping",
    "Custom Request",
  ];

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        mt: "100px",
        height: 80,
        borderBottom: "1px #183439 solid",
        ...sx,
      }}
      color="background"
      elevation={0}
      {...other}
    >
      <Toolbar sx={{ justifyContent: "space-evenly", mx: 16 }}>
        {categories.map((category, i) => (
          <Button
            key={i}
            variant="text"
            color="inherit"
            children={category}
            sx={{
              fontWeight: 300,
              textTransform: "uppercase",
              width: 180,
              px: 4,
            }}
          />
        ))}
      </Toolbar>
    </AppBar>
  );
}

type AppToolbarProps = Omit<AppBarProps, "children">;
