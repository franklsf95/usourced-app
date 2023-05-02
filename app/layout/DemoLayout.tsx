/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Container, Typography } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { DemoToolbar } from "./components/DemoToolbar.js";

function DemoBanner(): JSX.Element {
  return (
    <Box sx={{ backgroundColor: "#183439", height: 32, py: 1, mt: 12 }}>
      <Container>
        <Typography
          variant="h1"
          fontSize={16}
          textTransform="uppercase"
          color="white"
          align="center"
        >
          Demo site &ndash; we are launching in Q3 2023
        </Typography>
      </Container>
    </Box>
  );
}

/**
 * The primary application layout.
 */
export function DemoLayout(): JSX.Element {
  return (
    <React.Fragment>
      <DemoToolbar />
      <DemoBanner />

      <React.Suspense>
        <Outlet />
      </React.Suspense>
    </React.Fragment>
  );
}
