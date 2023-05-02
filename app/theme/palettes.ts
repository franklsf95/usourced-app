/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { type PaletteOptions } from "@mui/material/styles";

export const light: PaletteOptions = {
  mode: "light",

  primary: {
    main: "#183439",
  },

  secondary: {
    main: "#F5CCB6",
  },

  background: {
    default: "rgb(240,242,245)",
  },

  grass: {
    main: "#C4EA98",
  },

  example: {
    primary: "#183439",
    secondary: "#F5CCB6",
  },
};

export const dark: PaletteOptions = {
  mode: "dark",

  primary: {
    main: "#183439",
  },

  secondary: {
    main: "#F5CCB6",
  },

  grass: {
    main: "#C4EA98",
  },

  background: {
    default: "rgb(24,25,26)",
  },

  example: {
    primary: "#183439",
    secondary: "#F5CCB6",
  },
};

export default { light, dark };

/**
 * Append custom variables to the palette object.
 * https://mui.com/material-ui/customization/theming/#custom-variables
 */
declare module "@mui/material/styles" {
  interface Palette {
    example: {
      primary: string;
      secondary: string;
    };
    grass: {
      main: string;
    };
  }

  interface PaletteOptions {
    example: {
      primary: string;
      secondary: string;
    };
    grass: {
      main: string;
    };
  }
}
