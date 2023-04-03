import { Accounts } from "meteor/accounts-base";
import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const SignUpView = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    Accounts.createUser({
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
      //   name: data.get("name")?.toString(),
      //   phone: data.get("phone")?.toString(),
      //   company: data.get("company")?.toString(),
      //   businessWebsite: data.get("business-website")?.toString(),
      //   businessType: data.get("business-type-radio-buttons-group")?.toString(),
    });
  };
  return (
    <Container maxWidth="sm" id="signup" sx={{ pt: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Your Name"
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="company"
                label="Your Company's Name"
                name="company"
                autoComplete="company"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="business-website"
                label="Your Business Website"
                name="business-website"
                autoComplete="website"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="business-type-radio-buttons-group-label">
                  Business Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="business-type-radio-buttons-group-label"
                  name="business-type-radio-buttons-group">
                  <FormControlLabel
                    value="brand"
                    control={<Radio />}
                    label="Brand"
                  />
                  <FormControlLabel
                    value="creator"
                    control={<Radio />}
                    label="Creator"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="agree" />}
                label={
                  <div>
                    <span>I accept the </span>
                    <Link href={"/terms"}>Terms of Use</Link>.
                  </div>
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
