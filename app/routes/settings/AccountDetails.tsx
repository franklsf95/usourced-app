/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { updateEmail, updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import * as React from "react";
import { useAuthCallback, useCurrentUser } from "../../core/auth.js";
import { db } from "../../core/firebase.js";
import { usePageEffect } from "../../core/page.js";

export default function AccountDetails(): JSX.Element {
  const [{ input, ...state }, setState] = useState();
  const handleChange = useHandleChange(setState);
  const handleSubmit = useHandleSubmit(input, setState);

  usePageEffect({ title: "Account Details" });

  return (
    <Container sx={{ my: 4 }} maxWidth="sm">
      <Typography sx={{ mb: 4 }} variant="h2" children="Account Details" />

      {state.error && (
        <Alert sx={{ mb: 3 }} severity={"error"} children={state.error} />
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="email"
          type="email"
          label="Email"
          value={input.email}
          helperText={" "}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          disabled
        />
        <TextField
          name="displayName"
          label="Your Name"
          value={input.displayName}
          helperText={" "}
          onChange={handleChange}
          disabled={state.loading}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={input.phoneNumber}
          helperText={" "}
          onChange={handleChange}
          disabled={state.loading}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Button
          variant="contained"
          type="submit"
          children="Update Profile"
          disabled={state.loading}
        />
      </Box>
    </Container>
  );
}

type UserData = {
  email: string;
  phoneNumber: string;
  companyName: string;
};

async function fetchUserData(uid: string): Promise<UserData | undefined> {
  const userDoc = await getDoc(doc(db, "user_data", uid));
  return userDoc.data() as UserData;
}

function useState() {
  const me = useCurrentUser();
  const [state, setState] = React.useState({
    input: {
      displayName: me?.displayName ?? "",
      email: me?.email ?? "",
      phoneNumber: me?.phoneNumber ?? "",
    },
    userData: undefined as UserData | undefined,
    loading: me === undefined,
    error: undefined as string | undefined,
  });

  React.useEffect(() => {
    async function onCurrentUser() {
      if (me?.uid) {
        try {
          const userData = await fetchUserData(me.uid);
          setState((prev) => ({
            ...prev,
            input: {
              ...prev.input,
              displayName: me.displayName ?? "",
              email: me.email ?? "",
              phoneNumber: userData?.phoneNumber ?? "",
            },
            userData,
            loading: false,
          }));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          setState((prev) => ({ ...prev, error: err.message }));
        }
      }
    }
    onCurrentUser();
  }, [setState, me]);

  return [state, setState] as const;
}

function useHandleChange(setState: SetState) {
  return React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setState((prev) => ({
        ...prev,
        input: { ...prev.input, [name]: value },
      }));
    },
    [setState],
  );
}

function useHandleSubmit(input: Input, setState: SetState) {
  const saveProfile = useAuthCallback(
    async (me) => {
      await updateProfile(me, { displayName: input.displayName });
      await updateEmail(me, input.email);
    },
    [input.displayName, input.email],
  );

  return React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setState((prev) => ({ ...prev, loading: true }));
      try {
        await saveProfile();
        setState((prev) => ({ ...prev, loading: false, error: undefined }));
      } catch (err) {
        const error = (err as Error)?.message ?? "Failed.";
        setState((prev) => ({ ...prev, loading: false, error }));
      }
    },
    [setState, saveProfile],
  );
}

type Input = ReturnType<typeof useState>[0]["input"];
type SetState = ReturnType<typeof useState>[1];
