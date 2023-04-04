import React from "react";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { HOME } from "../common/routes";

export const GlobalFooter = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 12, mb: 6 }}>
      {"Copyright © "}
      <Link color="inherit" href={HOME}>
        USourced, Inc
      </Link>
      {". "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
