import { Typography } from "@mui/material";

export function AppFooter() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 12, mb: 6 }}
    >
      &copy; USourced, Inc. {new Date().getFullYear()}
    </Typography>
  );
}
