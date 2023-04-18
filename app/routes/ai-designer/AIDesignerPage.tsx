/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { usePageEffect } from "../../core/page.js";

const PRODUCT_NAME = "Cloud-Handle Ceremic Mug";

function PricingEstimatorView(): JSX.Element {
  const [quantity, setQuantity] = React.useState(100);
  const [shippingSpeed, setShippingSpeed] = React.useState(2);
  const totalPrice = quantity * 5.0 + shippingSpeed * 100;
  return (
    <Paper elevation={1} sx={{ px: 2, py: 2, borderRadius: 2 }}>
      <Typography variant="h2" mb={4}>
        Pricing Estimator
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Quantity</InputLabel>
        <Select
          value={quantity}
          label="Quantity"
          onChange={(_, value) => setQuantity(value as number)}
        >
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={250}>250</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Shipping Speed</InputLabel>
        <Select
          value={shippingSpeed}
          label="Shipping Speed"
          onChange={(_, value) => setShippingSpeed(value as number)}
        >
          <MenuItem value={1}>All Express</MenuItem>
          <MenuItem value={2}>10% Express, 90% Economy</MenuItem>
          <MenuItem value={3}>All Economy</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h3" mb={1}>
        Total: ${totalPrice}
      </Typography>
      <Button variant="text" sx={{ fontSize: 12, textDecoration: "underline" }}>
        View cost breakdown
      </Button>
    </Paper>
  );
}

function TimelineEstimatorView(): JSX.Element {
  return (
    <Paper elevation={1} sx={{ px: 2, py: 2, borderRadius: 2 }}>
      <Typography variant="h2" mb={2}>
        Timeline Estimator
      </Typography>
      <Typography variant="h4" mb={2}>
        Production time: <b>7 business days</b>
      </Typography>
      <Typography variant="h4" mb={2}>
        Express Shipping:
      </Typography>
      <Typography variant="h4" mb={2}>
        Deliver by <b>May 1, 2023</b>
      </Typography>
      <Typography variant="h4" mb={2}>
        Economy Shipping:
      </Typography>
      <Typography variant="h4" mb={2}>
        Deliver by <b>May 20, 2023</b>
      </Typography>
    </Paper>
  );
}

function ProductConfiguratorView(): JSX.Element {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h1" component="h1" mb={4}>
        {PRODUCT_NAME}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              width: "100%",
              height: 400,
              border: "1px solid black",
            }}
          >
            Sample Image
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <PricingEstimatorView />
            <TimelineEstimatorView />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default function AIDesignerPage(): JSX.Element {
  usePageEffect({ title: PRODUCT_NAME });

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ProductConfiguratorView />
        </Grid>
        <Grid item xs={6}>
          <h1>Hello</h1>
        </Grid>
      </Grid>
    </Container>
  );
}
