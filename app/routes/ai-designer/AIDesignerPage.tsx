/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useScene } from "../../common/chat/playbook.js";
import { usePageEffect } from "../../core/page.js";
import { AIChat } from "./components/AIChat.js";

function PricingEstimatorView(): JSX.Element {
  const [quantity, setQuantity] = React.useState(100);
  const [shippingSpeed, setShippingSpeed] = React.useState(2);
  const totalPrice = quantity * 5.0 + shippingSpeed * 100;
  return (
    <Paper elevation={1} sx={{ px: 2, py: 2, borderRadius: 2 }}>
      <Typography variant="h2" mb={4}>
        Pricing Estimates
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
        Timeline Estimates
      </Typography>
      {/* <Typography variant="h4" mb={2}>
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
      </Typography> */}
    </Paper>
  );
}

function ProductMockupEmptyView(): JSX.Element {
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        border: "1px dashed black",
        borderRadius: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 4,
      }}
    >
      <Typography variant="h2">
        product mockup will
        <br /> show up here
      </Typography>
    </Box>
  );
}

function ProductMockupImageView({ url }: { url: string }): JSX.Element {
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 4,
      }}
    >
      <img src={url} alt="Product mockup" width="100%" />
    </Box>
  );
}

function ProductMockupView({ url }: { url: string }): JSX.Element {
  return url ? (
    <ProductMockupImageView url={url} />
  ) : (
    <ProductMockupEmptyView />
  );
}

function ProductConfiguratorView(): JSX.Element {
  const { scene } = useScene();
  return (
    <Container>
      <Typography variant="h1" component="h1" mb={4}>
        {scene.productName}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ProductMockupView url={scene.productMockupState} />
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

function DemoControlBar(): JSX.Element {
  const { sceneNumber, incrementSceneNumber } = useScene();
  return (
    <Snackbar open>
      <div>
        <Stack direction="row">
          <IconButton onClick={() => incrementSceneNumber(-1)}>
            <ArrowCircleLeft />
          </IconButton>
          <Chip label={sceneNumber} variant="outlined" sx={{ mt: 0.5 }} />
          <IconButton
            onClick={() => {
              incrementSceneNumber(1);
              if (sceneNumber % 2 === 0) {
                // Automatically advance to next scene to simulate AI response
                setTimeout(() => {
                  incrementSceneNumber(1);
                }, 1000);
              }
            }}
          >
            <ArrowCircleRight />
          </IconButton>
        </Stack>
      </div>
    </Snackbar>
  );
}

export default function AIDesignerPage(): JSX.Element {
  usePageEffect({ title: "AI Designer" });

  return (
    <Container maxWidth="xl" sx={{ pt: 6 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ProductConfiguratorView />
        </Grid>
        <Grid item xs={6}>
          <AIChat />
        </Grid>
      </Grid>
      <DemoControlBar />
    </Container>
  );
}
