/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Toolbar } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { DemoToolbar } from "./components/DemoToolbar.js";

/**
 * The primary application layout.
 */
export function DemoLayout(): JSX.Element {
  return (
    <React.Fragment>
      <DemoToolbar />
      <Toolbar />

      <React.Suspense>
        <Outlet />
      </React.Suspense>
    </React.Fragment>
  );
}
