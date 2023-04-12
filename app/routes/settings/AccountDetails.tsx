/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Help } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { useAuthCallback, useCurrentUser } from "../../core/auth.js";
import { db } from "../../core/firebase.js";
import { usePageEffect } from "../../core/page.js";

declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    secondary: true;
  }
}

function useSearchParams(): URLSearchParams {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

export default function AccountDetails(): JSX.Element {
  const searchParams = useSearchParams();
  const isNewUserLanding = !!searchParams.get("newUser");

  const [{ input, ...state }, setState] = useState();
  const handleChange = useHandleChange(setState);
  const handleSubmit = useHandleSubmit(input, setState);

  usePageEffect({ title: "Account Details" });

  const onSuccessAlertClose = () => {
    setState((prev) => ({ ...prev, success: false }));
  };

  return (
    <Container sx={{ my: 4 }} maxWidth="sm">
      {isNewUserLanding && (
        <Alert
          variant="outlined"
          severity="info"
          color="secondary"
          sx={{ mb: 4 }}
        >
          Welcome to USourced! Please fill in your company&apos;s information
          below so that you can start creating your projects.
        </Alert>
      )}
      <Typography sx={{ mb: 4 }} variant="h1" children="Account Details" />

      {state.error && (
        <Alert sx={{ mb: 3 }} severity={"error"} children={state.error} />
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="email"
          type="email"
          label="Email"
          value={input.email}
          onChange={handleChange}
          fullWidth
          disabled
          sx={{ mb: 3 }}
        />
        <TextField
          name="displayName"
          label="Your Name"
          value={input.displayName}
          onChange={handleChange}
          disabled={state.loading}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={input.phoneNumber}
          onChange={handleChange}
          disabled={state.loading}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Typography sx={{ mb: 2 }} variant="h3" children="Your Company" />
        <TextField
          name="companyName"
          label="Company Name"
          value={input.companyName}
          onChange={handleChange}
          disabled={state.loading}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          name="companyWebsite"
          label="Company Website"
          value={input.companyWebsite}
          onChange={handleChange}
          disabled={state.loading}
          fullWidth
          sx={{ mb: 3 }}
        />
        <FormControl>
          <FormLabel id="businessType-label">Business Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="businessType-label"
            name="businessType"
            value={input.businessType}
            onChange={handleChange}
          >
            <FormControlLabel value="brand" control={<Radio />} label="Brand" />
            <FormControlLabel
              value="creator"
              control={<Radio />}
              label="Creator"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        {!isNewUserLanding && (
          <Typography sx={{ my: 2 }} variant="h3">
            Associated Companies
            <Tooltip title="You can access projects of your associated companies. If this list is wrong, please contact support.">
              <IconButton>
                <Help />
              </IconButton>
            </Tooltip>
            <Stack direction="row" spacing={2}>
              {input.linkedCompanies.map((company) => (
                <Chip key={company.id} label={company.name} color="secondary" />
              ))}
            </Stack>
          </Typography>
        )}

        <div className="clearfix"></div>
        <Button
          variant="contained"
          type="submit"
          children={isNewUserLanding ? "Create Profile" : "Update Profile"}
          disabled={state.loading}
          sx={{ mt: 4 }}
        />

        <Snackbar
          autoHideDuration={10000}
          open={state.success}
          onClose={onSuccessAlertClose}
        >
          <Alert severity="success" onClose={onSuccessAlertClose}>
            Successfully {isNewUserLanding ? "created" : "updated"} profile.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

type LinkedCompany = {
  id: string;
  name: string;
};

type UserData = {
  email: string;
  phoneNumber: string;
  companyName: string;
  companyWebsite: string;
  businessType: string;
  linkedCompanies: LinkedCompany[];
};

async function fetchUserData(uid: string): Promise<UserData | undefined> {
  const userDoc = await getDoc(doc(db, "user_data", uid));
  // if user doc does not exist, create a new one
  return userDoc.data() as UserData;
}

function useState() {
  const me = useCurrentUser();
  const [state, setState] = React.useState({
    input: {
      displayName: me?.displayName ?? "",
      email: me?.email ?? "",
      phoneNumber: "",
      companyName: "",
      companyWebsite: "",
      businessType: "",
      linkedCompanies: [] as LinkedCompany[],
    },
    userData: undefined as UserData | undefined,
    loading: me === undefined,
    error: undefined as string | undefined,
    success: false,
  });

  React.useEffect(() => {
    async function effect() {
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
              companyName: userData?.companyName ?? "",
              companyWebsite: userData?.companyWebsite ?? "",
              businessType: userData?.businessType ?? "",
              linkedCompanies: userData?.linkedCompanies ?? [],
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
    effect();
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
      // update user data in firestore user_data table
      await setDoc(doc(db, "user_data", me.uid), {
        email: input.email,
        displayName: input.displayName,
        phoneNumber: input.phoneNumber,
        companyName: input.companyName,
        companyWebsite: input.companyWebsite,
        businessType: input.businessType,
      });
    },
    [input],
  );

  return React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setState((prev) => ({ ...prev, loading: true, success: false }));
      try {
        await saveProfile();
        setState((prev) => ({
          ...prev,
          loading: false,
          error: undefined,
          success: true,
        }));
      } catch (err) {
        const error = (err as Error)?.message ?? "Failed.";
        setState((prev) => ({
          ...prev,
          loading: false,
          error,
          success: false,
        }));
      }
    },
    [setState, saveProfile],
  );
}

type Input = ReturnType<typeof useState>[0]["input"];
type SetState = ReturnType<typeof useState>[1];
