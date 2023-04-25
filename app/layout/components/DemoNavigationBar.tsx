/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { AppBar, AppBarProps, Button, Toolbar } from "@mui/material";
import { RouterLink } from "../../common/RouterLink.js";

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    background: true;
  }
}

export function DemoNavigationBar(props: AppToolbarProps): JSX.Element {
  const { sx, ...other } = props;
  const buttonSx = {
    fontWeight: 300,
    textTransform: "uppercase",
    width: 240,
    px: 4,
  };

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
        <Button
          variant="text"
          color="inherit"
          children={"Shop All"}
          sx={buttonSx}
        />
        <Button
          component={RouterLink}
          href="/custom-request"
          variant="text"
          color="inherit"
          children="Custom Request"
          sx={buttonSx}
        />
        <Button
          variant="text"
          color="inherit"
          children={"Demo"}
          sx={buttonSx}
        />
      </Toolbar>
    </AppBar>
  );
}

type AppToolbarProps = Omit<AppBarProps, "children">;
