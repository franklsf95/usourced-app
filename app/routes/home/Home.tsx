/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box } from "@mui/material";
import { usePageEffect } from "../../core/page.js";

export default function Home(): JSX.Element {
  usePageEffect({ title: "" });

  return (
    <a href="#signup">
      <Box component="img" src="/homepage-banner.gif" width="100%" />
    </a>
  );
}
