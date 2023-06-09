/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Button,
  OutlinedInputProps,
  TextField,
  TextFieldProps,
  styled,
} from "@mui/material";
import * as React from "react";
import { useCurrentUser } from "../../../core/auth.js";
import { useSnackBar } from "../../../layout/components/SnackBarContext.js";
import { addNewsletterSubscriber } from "../../../models/newsletter_subscribers.js";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    grass: true;
  }
}

const MyTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    transition: theme.transitions.create(["background-color"]),
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.5)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255,255,255,0.8)",
    },
  },
}));

export function NewsletterSignUp2(): JSX.Element {
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
      <MyTextField
        label="Enter your email"
        variant="filled"
        value={email}
        onChange={handleChange}
        type="email"
        autoComplete="email"
        sx={{ width: "40ch" }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="grass"
        sx={{ ml: 2, height: 56, color: "#222", borderRadius: 10 }}
      >
        Sign Up
      </Button>
    </>
  );
}
