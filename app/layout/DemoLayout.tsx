/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Email, Place } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { NewsletterSignUp2 } from "../routes/home/components/NewsletterSignUp2.js";
import { DemoToolbar } from "./components/DemoToolbar.js";
import { SnackBarProvider } from "./components/SnackBarContext.js";

function DemoBanner(): JSX.Element {
  return (
    <Box sx={{ backgroundColor: "#183439", height: 32, py: 1, mt: 12 }}>
      <Container>
        <Typography
          variant="h1"
          fontSize={16}
          textTransform="uppercase"
          color="white"
          align="center"
        >
          Demo site &ndash; we are launching in Q3 2023
        </Typography>
      </Container>
    </Box>
  );
}

function Footer(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        backgroundImage: "url(/home/footer-background.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        pt: 16,
      }}
    >
      <Container maxWidth="lg" sx={{ color: "white", pb: 10 }}>
        <Box mb={8}>
          <Typography variant="h1" fontSize={64} mb={4}>
            Sign Up for Our Newsletter
          </Typography>
          <NewsletterSignUp2 />
        </Box>
        <hr style={{ opacity: 0.25 }} />
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <img src="/usourced-masthead-white.png" height={44} />
            <Typography variant="h4" mt={2}>
              <Email fontSize="small" sx={{ mr: 1 }} /> hello@usourced.com
            </Typography>
            <Typography variant="h4" mt={1}>
              <Place fontSize="small" sx={{ mr: 1 }} /> 600 N Broad St, Ste 5
              #3766, Middletown, DE 19709
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          backgroundColor: "#142A2E",
          color: "#B5B5B5",
          textAlign: "center",
          pt: 4,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          &copy; USourced Inc. 2023. All Rights Reserved.
        </Container>
      </Box>
    </Box>
  );
}

/**
 * The primary application layout.
 */
export function DemoLayout(): JSX.Element {
  return (
    <React.Fragment>
      <SnackBarProvider>
        <React.Suspense>
          <DemoToolbar />
          <DemoBanner />
          <Outlet />
          <Footer />
        </React.Suspense>
      </SnackBarProvider>
    </React.Fragment>
  );
}
