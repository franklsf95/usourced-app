/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Alert, Button, Container, Typography } from "@mui/material";
import { AuthIcon } from "../../layout/components/icons/AuthIcon.js";
import { Props, useHandleSignIn, useState } from "./Login.hooks.js";
import { Notice } from "./Notice.js";

/**
 * The login and registration page inspired by Notion. Example:
 *
 *    https://www.notion.so/login
 *    https://www.notion.so/signup
 */
export default function Login(props: Props): JSX.Element {
  const [state, setState] = useState(props);
  const handleSignIn = useHandleSignIn(setState);
  const isSignUp = props.mode === "signup";

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
        flexGrow: 0.8,
      }}
    >
      <Typography
        sx={{ mb: 2, fontWeight: 800, order: -3 }}
        variant="h1"
        align="center"
        children={isSignUp ? "Sign Up" : "Login"}
      />

      {state.error && (
        <Alert
          sx={{ mb: 2, order: -2 }}
          severity="error"
          children={state.error}
        />
      )}

      {state.otpSent && (
        <Alert sx={{ mb: 2 }} severity="success">
          Please enter the One Time Password (OTP) that has been sent to your
          email address.
        </Alert>
      )}

      <Button
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "white" : undefined,
          order: isSignUp ? undefined : -2,
        }}
        color="inherit"
        type="submit"
        variant="outlined"
        size="large"
        children="Continue with Google"
        startIcon={<AuthIcon variant="google.com" />}
        onClick={handleSignIn}
        data-method="google.com"
        fullWidth
      />

      <Notice sx={{ mt: 4 }} />
    </Container>
  );
}
