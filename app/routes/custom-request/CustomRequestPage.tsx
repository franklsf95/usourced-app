/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Typography } from "@mui/material";
import { usePageEffect } from "../../core/page.js";

export default function CustomRequestPage(): JSX.Element {
  usePageEffect({ title: "Custom Sourcing Request" });

  return (
    <Container>
      <Typography variant="h1">Custom Request</Typography>
    </Container>
  );
}
