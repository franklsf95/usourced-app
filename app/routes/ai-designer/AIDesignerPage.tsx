/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ArrowCircleLeft, ArrowCircleRight, Info } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Slider,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useScene } from "../../common/chat/playbook.js";
import { usePageEffect } from "../../core/page.js";
import { useSnackBar } from "../../layout/components/SnackBarContext.js";
import { InputSlider } from "../product-listing/components/InputSlider.js";
import { AIChat } from "./components/AIChat.js";

type PricingEstimatorState = {
  quantity: number | null;
  minQuantity: number;
};

function getTotalPrice(quantity: number, expressPercentage: number): number {
  const EXPRESS_PRICE_PER_ITEM = 5;
  const pricePerItem = 5;
  const expressPrice = EXPRESS_PRICE_PER_ITEM * quantity * expressPercentage;
  return pricePerItem * quantity + expressPrice;
}

function PricingCalculator({
  pricingState,
}: {
  pricingState: PricingEstimatorState;
}): JSX.Element {
  const [quantity, setQuantity] = React.useState<number>(
    pricingState.quantity ?? pricingState.minQuantity,
  );
  const [expressPercentage, setExpressPercentage] = React.useState<number>(0.1);
  const handleExpressPercentageChange = (
    _event: Event,
    value: number | number[],
  ) => {
    setExpressPercentage(value as number);
  };
  const totalPrice = getTotalPrice(quantity, expressPercentage);
  const { showDemoAlert } = useSnackBar();
  return (
    <Paper elevation={1} sx={{ px: 2, py: 2, borderRadius: 2 }}>
      <Typography variant="h2" mb={2} fontSize="1.5em">
        Bulk Price Calculator
      </Typography>
      <Typography variant="h5" gutterBottom>
        Choose quantity:
      </Typography>
      <InputSlider
        onChange={setQuantity}
        minValue={pricingState.minQuantity}
        maxValue={6000}
      />
      <Typography variant="h5" gutterBottom>
        Choose express shipping:
        <Tooltip
          title={
            <div>
              <div>Timeline including production:</div>
              <div>Standard shipping: 4&ndash;5 weeks</div>
              <div>
                Express shipping: 2&ndash;3 weeks, at an additional cost.
              </div>
              <div>
                We offer partial express shipping so you can get a portion of
                your order sooner, and save cost on the remaining items.
              </div>
            </div>
          }
        >
          <IconButton>
            <Info />
          </IconButton>
        </Tooltip>
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        sx={{ mb: 1, ml: 1, mr: 2 }}
        alignItems="center"
      >
        <span>0%</span>
        <Slider
          value={expressPercentage}
          onChange={handleExpressPercentageChange}
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value * 100}%`}
        />
        <span>100%</span>
      </Stack>
      <Typography variant="h6" fontSize={14} sx={{ ml: 1, mr: 2 }}>
        Express shipping {Math.round(quantity * expressPercentage)} items;
        standard shipping {Math.round(quantity * (1 - expressPercentage))} items
      </Typography>
      <Typography variant="h3" mt={2} mb={1} sx={{ fontWeight: 600 }}>
        Total: ${totalPrice.toFixed(2)}
      </Typography>
      <Button
        variant="text"
        onClick={showDemoAlert}
        sx={{ fontSize: 12, textDecoration: "underline" }}
      >
        View cost breakdown
      </Button>
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
      <Typography variant="h3" color="#333">
        product mockup will show up here
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
            <PricingCalculator pricingState={scene.pricingState} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

function DemoControlBar(): JSX.Element {
  const {
    sceneNumber,
    incrementSceneNumber,
    advanceSceneWithSimulatedAIResponse,
  } = useScene();
  return (
    <Snackbar open>
      <div>
        <Stack direction="row">
          <IconButton onClick={() => incrementSceneNumber(-1)}>
            <ArrowCircleLeft />
          </IconButton>
          <Chip label={sceneNumber} variant="outlined" sx={{ mt: 0.5 }} />
          <IconButton onClick={advanceSceneWithSimulatedAIResponse}>
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
    <Container maxWidth="xl" sx={{ pt: 6, pb: 10 }}>
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
