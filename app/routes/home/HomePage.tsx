/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box } from "@mui/material";
import { useCurrentUser } from "../../core/auth.js";
import { usePageEffect } from "../../core/page.js";

export default function HomePage(): JSX.Element {
  usePageEffect({ title: "" });
  const me = useCurrentUser();

  return (
    <a href={me ? "/projects/new" : "/login"}>
      <Box component="img" src="/homepage-banner.gif" width="100%" />
    </a>
  );
}
