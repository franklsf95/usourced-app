/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Info, ZoomIn, ZoomOut } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ButtonGroupSelector } from "../../common/ButtonGroupSelector.js";
import { ColorSelector } from "../../common/ColorSelector.js";
import { usePageEffect } from "../../core/page.js";
import { useSnackBar } from "../../layout/components/SnackBarContext.js";
import { InputSlider } from "./components/InputSlider.js";

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
      color: "#9CAFC4",
      mockup_url: "/demo/mugs/blue.JPG",
    },
    {
      color: "#EEE2C8",
      mockup_url: "/demo/mugs/cream.JPG",
    },
    {
      color: "#DCD1A2",
      mockup_url: "/demo/mugs/green.JPG",
    },
    {
      color: "#E8C6C6",
      mockup_url: "/demo/mugs/pink.JPG",
    },
    {
      color: "#D3CBD6",
      mockup_url: "/demo/mugs/purple.JPG",
    },
    {
      color: "#EBD59A",
      mockup_url: "/demo/mugs/yellow.JPG",
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

function getTotalPrice(
  quantity: number,
  expressPercentage: number,
  pricingTiers: PricingTier[],
): number {
  const EXPRESS_PRICE_PER_ITEM = 5;
  const pricePerItem = getPricePerItem(quantity, pricingTiers);
  const expressPrice = EXPRESS_PRICE_PER_ITEM * quantity * expressPercentage;
  return pricePerItem * quantity + expressPrice;
}

function PricingCalculator({
  pricingTiers,
}: {
  pricingTiers: PricingTier[];
}): JSX.Element {
  const [quantity, setQuantity] = React.useState<number>(1000);
  const [expressPercentage, setExpressPercentage] = React.useState<number>(0.1);
  const handleExpressPercentageChange = (
    _event: Event,
    value: number | number[],
  ) => {
    setExpressPercentage(value as number);
  };
  const totalPrice = getTotalPrice(quantity, expressPercentage, pricingTiers);
  const { showDemoAlert } = useSnackBar();
  return (
    <Paper elevation={1} sx={{ px: 2, py: 2, borderRadius: 2 }}>
      <Typography variant="h2" mt={2} mb={2} fontSize="1.5em">
        Bulk Price Calculator
      </Typography>
      <Typography variant="h5" gutterBottom>
        Choose quantity:
      </Typography>
      <InputSlider onChange={setQuantity} minValue={1000} maxValue={6000} />
      <Typography variant="h5" gutterBottom>
        Choose express shipping:
        <IconButton>
          <Info />
        </IconButton>
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

function ProductMockupImageView({ url }: { url: string }): JSX.Element {
  return (
    <Paper elevation={1}>
      <Box sx={{ position: "relative" }}>
        <Typography
          variant="h5"
          mb={1}
          sx={{ position: "absolute", top: 16, left: 16 }}
        >
          Drag to view in 3D
        </Typography>
        <IconButton sx={{ position: "absolute", top: 40, left: 10 }}>
          <ZoomIn />
        </IconButton>
        <IconButton sx={{ position: "absolute", top: 70, left: 10 }}>
          <ZoomOut />
        </IconButton>
      </Box>
      <Box
        component="img"
        src={url}
        width={400}
        height={400}
        sx={{ ml: 8, mt: 4, mb: 4 }}
      />
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
  const { showDemoAlert } = useSnackBar();
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
      <Button variant="contained" color="primary" onClick={showDemoAlert}>
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
        backgroundColor: "white",
        p: "0px 10px 10px 24px",
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
  return (
    <Box height={540} width={236} sx={{ overflowY: "scroll" }}>
      <Stack spacing={2}>
        {productListing.variants.map((variant) => (
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
    [],
  );
  const handleSelectColor = React.useCallback(
    (color: string) => {
      setSelectedVariant(colorToVariantMap[color]);
    },
    [colorToVariantMap],
  );

  return (
    <Container maxWidth="xl" sx={{ pt: 6, pb: 10 }}>
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
