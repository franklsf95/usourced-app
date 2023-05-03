/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { usePageEffect } from "../../core/page.js";

export default function NewProjectPage(): JSX.Element {
  usePageEffect({ title: "New Sourcing Request" });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" mb={3}>
          New Sourcing Request
        </Typography>
        <Typography variant="subtitle1">
          Limit one submission to one product only - if you are looking to
          source multiple products, please submit this same form. Thanks!
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              // value={input.email}
              // onChange={handleChange}
              placeholder="What product are you looking to source?"
            />
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                placeholder="At what quantity?"
                helperText="If you would like to get quotes for multiple quantities, enter them like 100/250/500."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dimension"
                name="dimension"
                placeholder="What's the ideal dimension in inches?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Material"
                name="material"
                placeholder="Any preferred material?"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
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
}
