/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ZoomIn, ZoomOut } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ButtonGroupSelector } from "../../common/ButtonGroupSelector.js";
import { ColorSelector } from "../../common/ColorSelector.js";
import InputSlider from "../../common/InputSlider.js";
import { usePageEffect } from "../../core/page.js";

type Selection = {
  label: string;
  value: string;
};

type PricingTier = {
  quantity: number;
  pricePerItem: number;
};

type ProductVariant = {
  color: string;
  mockup_url: string;
};

type ProductListing = {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  earliestShippingDate: string;
  variants: ProductVariant[];
  printEffectSelections: Selection[];
  pricingTiers: PricingTier[];
};

const productListing: ProductListing = {
  id: "1",
  name: "Cloud-Handle Ceramic Mug",
  rating: 5.0,
  reviewsCount: 96,
  earliestShippingDate: "May 1, 2023",
  variants: [
    {
      color: "#FFFFFF",
      mockup_url: "/demo/mugs/blue.png",
    },
    {
      color: "#C8E0FC",
      mockup_url: "/demo/mugs/blue.png",
    },
    {
      color: "#EFD0FA",
      mockup_url: "/demo/mugs/purple.png",
    },
    {
      color: "#F4AEA6",
      mockup_url: "/demo/mugs/purple.png",
    },
    {
      color: "#FFD9C4",
      mockup_url: "/demo/mugs/green.png",
    },
    {
      color: "#CFFAC0",
      mockup_url: "/demo/mugs/green.png",
    },
    {
      color: "#F7F1B9",
      mockup_url: "/demo/mugs/yellow.png",
    },
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
  pricingTiers: [
    {
      quantity: 1000,
      pricePerItem: 5,
    },
    {
      quantity: 2000,
      pricePerItem: 4,
    },
    {
      quantity: 3000,
      pricePerItem: 3.5,
    },
    {
      quantity: 5000,
      pricePerItem: 3,
    },
  ],
};

function getPricePerItem(
  quantity: number,
  pricingTiers: PricingTier[],
): number {
  const tier = pricingTiers.find((tier) => tier.quantity >= quantity);
  return tier
    ? tier.pricePerItem
    : pricingTiers[pricingTiers.length - 1].pricePerItem;
}

function PricingCalculator({
  pricingTiers,
}: {
  pricingTiers: PricingTier[];
}): JSX.Element {
  const [quantity, setQuantity] = React.useState<number>(1000);
  const pricePerItem = getPricePerItem(quantity, pricingTiers);
  return (
    <Paper elevation={1} sx={{ px: 2, py: 2, borderRadius: 2 }}>
      <Typography variant="h2" mt={2} mb={2} fontSize="1.5em">
        Bulk Price Calculator
      </Typography>
      <InputSlider onChange={setQuantity} />
      <Typography variant="h3" mt={1} mb={1}>
        ${pricePerItem.toFixed(2)}/item
      </Typography>
      <Button variant="text" sx={{ fontSize: 12, textDecoration: "underline" }}>
        View cost breakdown
      </Button>
    </Paper>
  );
}

function ProductMockupImageView({ url }: { url: string }): JSX.Element {
  return (
    <Paper elevation={1} sx={{ backgroundColor: "#F8F6F3" }}>
      <Box sx={{ float: "left", p: 2 }}>
        <Typography variant="h5" mb={1}>
          Drag to view in 3D
        </Typography>
        <Box>
          <IconButton>
            <ZoomIn />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <ZoomOut />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 400,
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 12,
          pt: 0,
          pl: 16,
        }}
      >
        <img src={url} alt="Product mockup" width="100%" />
      </Box>
    </Paper>
  );
}

function ProductDetailsView({
  productListing,
  handleSelectColor,
}: {
  productListing: ProductListing;
  handleSelectColor: (color: string) => void;
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
      <Typography variant="h5" mt={7} fontWeight={600}>
        Ships as early as {productListing.earliestShippingDate}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" my={1}>
          Choose base color:
        </Typography>
        <ColorSelector
          colors={productListing.variants.map((v) => v.color)}
          onSelect={handleSelectColor}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" my={1}>
          Choose print effect:
        </Typography>
        <ButtonGroupSelector choices={productListing.printEffectSelections} />
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <PricingCalculator pricingTiers={productListing.pricingTiers} />
      </Box>
      <Button variant="contained" color="primary">
        Customize Now
      </Button>
    </Container>
  );
}

function ProductMockupView({
  selectedVariant,
}: {
  selectedVariant: ProductVariant;
}): JSX.Element {
  return (
    <>
      <ProductMockupImageView url={selectedVariant.mockup_url} />
      <Typography variant="h5" mt={2} mb={2} sx={{ fontWeight: 700 }}>
        + Specs & Details
      </Typography>
    </>
  );
}

function ProductVariantView({
  variant,
}: {
  variant: ProductVariant;
}): JSX.Element {
  return (
    <Box
      sx={{
        width: 220,
        height: 220,
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F6F3",
        p: 4,
        pl: 8,
      }}
    >
      <img src={variant.mockup_url} alt={variant.color} width="100%" />
    </Box>
  );
}

function ProductVariantsListView({
  productListing,
}: {
  productListing: ProductListing;
}): JSX.Element {
  const variants = productListing.variants;
  const selectedVariants = [variants[0], variants[2], variants[4], variants[6]];
  return (
    <Box height={540} width={236} sx={{ overflowY: "scroll" }}>
      <Stack spacing={2}>
        {selectedVariants.map((variant) => (
          <ProductVariantView key={variant.color} variant={variant} />
        ))}
      </Stack>
    </Box>
  );
}

export default function ProductListingPage(): JSX.Element {
  usePageEffect({ title: productListing.name });

  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant>(
    productListing.variants[0],
  );
  const colorToVariantMap = React.useMemo(
    () =>
      productListing.variants.reduce((acc, variant) => {
        acc[variant.color] = variant;
        return acc;
      }, {} as Record<string, ProductVariant>),
    [productListing.variants],
  );
  const handleSelectColor = React.useCallback(
    (color: string) => {
      setSelectedVariant(colorToVariantMap[color]);
    },
    [colorToVariantMap],
  );

  return (
    <Container maxWidth="xl" sx={{ pt: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <ProductVariantsListView productListing={productListing} />
        </Grid>
        <Grid item xs={4}>
          <ProductMockupView selectedVariant={selectedVariant} />
        </Grid>
        <Grid item xs={4}>
          <ProductDetailsView
            productListing={productListing}
            handleSelectColor={handleSelectColor}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
