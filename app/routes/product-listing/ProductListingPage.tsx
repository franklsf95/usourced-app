/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { ButtonGroupSelector } from "../../common/ButtonGroupSelector.js";
import { ColorSelector } from "../../common/ColorSelector.js";
import InputSlider from "../../common/InputSlider.js";
import { usePageEffect } from "../../core/page.js";

type Selection = {
  label: string;
  value: string;
};

type ProductListing = {
  id: string;
  name: string;
  mockup: {
    url: string;
  };
  rating: number;
  reviewsCount: number;
  earliestShippingDate: string;
  colorSelections: string[];
  printEffectSelections: Selection[];
};

const productListing: ProductListing = {
  id: "1",
  name: "Cloud-Handle Ceramic Mug",
  mockup: {
    url: "/demo/cloud-handle-mug-blue.png",
  },
  rating: 5.0,
  reviewsCount: 96,
  earliestShippingDate: "May 1, 2023",
  colorSelections: [
    "#FFFFFF",
    "#F7F1B9",
    "#C8E0FC",
    "#EFD0FA",
    "#CFFAC0",
    "#FFD9C4",
    "#F4AEA6",
  ],
  printEffectSelections: [
    {
      label: "Silk Printing",
      value: "silk_printing",
    },
    {
      label: "UV Printing",
      value: "uv_printing",
    },
    {
      label: "3D Sublimation",
      value: "sublimation",
    },
  ],
};

function PricingCalculator(): JSX.Element {
  return (
    <Paper elevation={1} sx={{ px: 2, py: 2, borderRadius: 2 }}>
      <Typography variant="h2" mt={2} mb={2}>
        Bulk Price Calculator
      </Typography>
      <InputSlider />
      <Typography variant="h3" mt={1} mb={1}>
        $5/item
      </Typography>
      <Button variant="text" sx={{ fontSize: 12, textDecoration: "underline" }}>
        View cost breakdown
      </Button>
    </Paper>
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

function ProductDetailsView({
  productListing,
}: {
  productListing: ProductListing;
}): JSX.Element {
  return (
    <Container>
      <Typography variant="h2">{productListing.name}</Typography>
      <Box sx={{ mt: 2 }}>
        <Rating
          value={productListing.rating}
          readOnly
          sx={{ float: "left", mr: 2 }}
        />
        <Typography variant="h5" sx={{ float: "left", mt: 0.5 }}>
          {productListing.reviewsCount} reviews
        </Typography>
      </Box>
      <Typography variant="h5" mt={6} fontWeight={600}>
        Earliest Shipping by: {productListing.earliestShippingDate}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" my={1}>
          Choose base color:
        </Typography>
        <ColorSelector colors={productListing.colorSelections} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" my={1}>
          Choose print effect:
        </Typography>
        <ButtonGroupSelector choices={productListing.printEffectSelections} />
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <PricingCalculator />
      </Box>
      <Button variant="contained" color="primary">
        Customize Now
      </Button>
    </Container>
  );
}

function ProductMockupView({
  productListing,
}: {
  productListing: ProductListing;
}): JSX.Element {
  return <ProductMockupImageView url={productListing.mockup.url} />;
}

function ProductVariantsListView({
  productListing,
}: {
  productListing: ProductListing;
}): JSX.Element {
  return (
    <Paper elevation={1} sx={{ px: 2, py: 2, borderRadius: 2 }}>
      <Typography variant="h2" mb={2}>
        Product Variants
      </Typography>
      <Typography variant="h3" mb={2}>
        {productListing.name}
      </Typography>
      <Typography variant="h4" mb={2}>
        {productListing.id}
      </Typography>
    </Paper>
  );
}

export default function ProductListingPage(): JSX.Element {
  usePageEffect({ title: productListing.name });

  return (
    <Container maxWidth="xl" sx={{ pt: 6 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <ProductVariantsListView productListing={productListing} />
        </Grid>
        <Grid item xs={4}>
          <ProductMockupView productListing={productListing} />
        </Grid>
        <Grid item xs={4}>
          <ProductDetailsView productListing={productListing} />
        </Grid>
      </Grid>
    </Container>
  );
}
