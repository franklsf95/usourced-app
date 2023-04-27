/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Close, Notifications } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import * as React from "react";
import { useCurrentUser } from "../../../core/auth.js";
import { addNewsletterSubscriber } from "../../../models/newsletter_subscribers.js";

export function NewsletterSignUp(): JSX.Element {
  const emailInputId = "demo-signup-email-input";
  const me = useCurrentUser();

  const [email, setEmail] = React.useState(me?.email ?? "");
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [snackBarSeverity, setSnackBarSeverity] =
    React.useState<AlertColor>("success");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    if (!email) {
      return;
    }
    try {
      await addNewsletterSubscriber(email, "homepage");
      setSnackBarMessage(
        "You are signed up. You will be the first to know when we launch!",
      );
      setSnackBarSeverity("success");
      setSnackBarOpen(true);
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setSnackBarMessage(err.message);
      setSnackBarSeverity("error");
      setSnackBarOpen(true);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };
  return (
    <>
      <FormControl sx={{ width: "25ch" }} variant="outlined">
        <InputLabel htmlFor={emailInputId}>Email</InputLabel>
        <OutlinedInput
          id={emailInputId}
          autoComplete="email"
          type="email"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleSubmit}>
                <Notifications />
              </IconButton>
            </InputAdornment>
          }
          label="Email"
          value={email}
          onChange={handleChange}
        />
      </FormControl>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert onClose={handleClose} severity={snackBarSeverity}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
