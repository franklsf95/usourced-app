/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import {
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useScene } from "../../common/chat/playbook.js";
import { usePageEffect } from "../../core/page.js";
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

function OrderSummaryView(): JSX.Element {
  const { scene } = useScene();
  return (
    <Paper
      elevation={1}
      sx={{ px: 2, py: 2, borderRadius: 2, height: "calc(100vh - 290px)" }}
    >
      <Typography variant="h2" mb={2} fontSize="1.5em">
        Order Summary
      </Typography>
      {scene.summary.length > 0 ? (
        scene.summary
      ) : (
        <Typography variant="h5" color="#333" gutterBottom>
          Summary of your chat with USourced AI will appear here.
        </Typography>
      )}
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
            <OrderSummaryView />
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
