/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { type Palette, type ThemeOptions } from "@mui/material/styles";

/**
 * Style overrides for Material UI components.
 */
export const components = (palette: Palette): ThemeOptions["components"] => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: "Karla",
        fontSize: 16,
        letterSpacing: 0.5,
        textTransform: "unset",
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        fontFamily: "Karla",
        fontSize: 18,
      },
      standardInfo: {
        backgroundColor: palette.primary.main,
        color: palette.primary.contrastText,
        opacity: 0.8,
        "& .MuiAlert-icon": {
          color: palette.primary.contrastText,
        },
      },
    },
  },
});
