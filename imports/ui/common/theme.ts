import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#183439",
    },
    secondary: {
      main: "#F5CCB6",
    },
  },
  typography: {
    fontFamily: [
      "Tenor Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {},
          style: {
            letterSpacing: 1,
            fontFamily: "Karla",
            fontSize: 16,
            fontWeight: 600,
          },
        },
      ],
    },
  },
});
