import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const GlobalFooter = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        USourced, Inc
      </Link>
      {". "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
