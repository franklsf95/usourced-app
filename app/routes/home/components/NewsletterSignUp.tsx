/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CircleNotifications } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import * as React from "react";
import { useCurrentUser } from "../../../core/auth.js";
import { useSnackBar } from "../../../layout/components/SnackBarContext.js";
import { addNewsletterSubscriber } from "../../../models/newsletter_subscribers.js";

export function NewsletterSignUp(): JSX.Element {
  const emailInputId = "demo-signup-email-input";
  const me = useCurrentUser();

  const [email, setEmail] = React.useState(me?.email ?? "");
  const { showAlert } = useSnackBar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    if (!email) {
      return;
    }
    try {
      await addNewsletterSubscriber(email, "homepage");
      showAlert({
        message:
          "You are signed up. You will be the first to know when we launch!",
        severity: "success",
      });
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showAlert({
        message: err.message,
        severity: "error",
      });
    }
  };

  return (
    <>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor={emailInputId} sx={{ fontSize: 14 }}>
          Enter your email
        </InputLabel>
        <OutlinedInput
          id={emailInputId}
          autoComplete="email"
          type="email"
          endAdornment={
            <InputAdornment position="end">
              <IconButton color="primary" edge="end" onClick={handleSubmit}>
                <CircleNotifications fontSize="large" />
              </IconButton>
            </InputAdornment>
          }
          label="Enter your email"
          value={email}
          onChange={handleChange}
          sx={{ borderRadius: 8, fontSize: 14 }}
        />
      </FormControl>
    </>
  );
}
