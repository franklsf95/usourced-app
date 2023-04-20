/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import { Outlet } from "react-router-dom";
import { DemoNavigationBar } from "./components/DemoNavigationBar.js";
import { DemoToolbar } from "./components/DemoToolbar.js";

/**
 * The primary application layout.
 */
export function DemoLayout(): JSX.Element {
  return (
    <React.Fragment>
      <DemoToolbar />
      <DemoNavigationBar />
      <div style={{ height: 180 }} />

      <React.Suspense>
        <Outlet />
      </React.Suspense>
    </React.Fragment>
  );
}
