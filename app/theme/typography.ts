/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { TypographyVariantsOptions } from "@mui/material/styles";

export const options: TypographyVariantsOptions = {
  fontFamily: [
    "Tenor Sans",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(","),
};

export const overrides: TypographyVariantsOptions = {
  h1: { fontSize: "2em" },
  h2: { fontSize: "1.75em" },
  h3: { fontSize: "1.5em", fontFamily: "Karla" },
  h4: { fontSize: "1.25em", fontFamily: "Karla" },
  h5: { fontSize: "1em", fontFamily: "Karla" },
  h6: { fontSize: "1em", fontFamily: "Karla" },
  button: { textTransform: "none" },
  body1: { fontFamily: "Karla" },
  body2: { fontFamily: "Karla" },
};
