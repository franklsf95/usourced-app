/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Toolbar, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import { AppFooter } from "./components/AppFooter.js";
import { AppToolbar } from "./components/AppToolbar.js";

export function RootError(): JSX.Element {
  const err = useRouteError() as RouteError;

  return (
    <>
      <AppToolbar />
      <Toolbar />

      <Container sx={{ marginTop: "25vh" }} maxWidth="sm">
        <Typography
          sx={{
            fontSize: "2em",
            fontWeight: 300,
            "& strong": { fontWeight: 400 },
          }}
          variant="h1"
          align="center"
        >
          <strong>Error{err.status ? err.status + " " : null}</strong>:{" "}
          {err.statusText ?? err.message}
        </Typography>
      </Container>

      <AppFooter />
    </>
  );
}

type RouteError = Error & { status?: number; statusText?: string };
