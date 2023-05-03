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
    fontWeight: 400,
    textTransform: "uppercase",
    width: 280,
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
          component={RouterLink}
          href="/custom-request"
          variant="text"
          color="inherit"
          children="Custom Request"
          sx={buttonSx}
        />
        <Button
          component={RouterLink}
          href="/products/1"
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
          children="AI Chat Demo"
          sx={buttonSx}
        />
      </Toolbar>
    </AppBar>
  );
}

type AppToolbarProps = Omit<AppBarProps, "children">;
