/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ZoomIn, ZoomOut } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Slide,
  Slider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
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
      quantity: 100,
      pricePerItem: 5,
    },
    {
      quantity: 200,
      pricePerItem: 4,
    },
    {
      quantity: 300,
      pricePerItem: 3.5,
    },
    {
      quantity: 500,
      pricePerItem: 3,
    },
  ],
  actual_images: [
    "/demo/mugs/actual/actual-01.jpg",
    "/demo/mugs/actual/actual-02.jpg",
    "/demo/mugs/actual/actual-03.jpg",
    "/demo/mugs/actual/actual-04.jpg",
    "/demo/mugs/actual/actual-05.jpg",
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

function PricingCalculator(): JSX.Element {
  const [quantity, setQuantity] = React.useState<number>(100);
  const [expressPercentage, setExpressPercentage] = React.useState<number>(0.1);
  const handleExpressPercentageChange = (
    _event: Event,
    value: number | number[],
  ) => {
    setExpressPercentage(value as number);
  };
  const totalPrice = getTotalPrice(
    quantity,
    expressPercentage,
    productListing.pricingTiers,
  );
  const { showDemoAlert } = useSnackBar();
  return (
    <Paper elevation={1} sx={{ px: 2, py: 2, borderRadius: 2 }}>
      <Typography variant="h2" mt={2} mb={2} fontSize="1.5em">
        Bulk Price Calculator
      </Typography>
      <Typography variant="h5" gutterBottom>
        How many would you like to order?
      </Typography>
      <InputSlider onChange={setQuantity} minValue={100} maxValue={1000} />
      <Typography variant="h5" mt={1} gutterBottom>
        How many units would you like{" "}
        <Tooltip
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "background.paper",
                color: "#183439",
                maxWidth: 400,
                fontSize: 14,
                lineHeight: 1.5,
                p: 2,
              },
            },
          }}
          title={
            <div>
              <div>
                We understand the importance of receiving your order quickly,
                which is why we offer partial express shipping. This means
                you&rsquo;ll receive a portion of your order sooner while saving
                on shipping costs for the remaining items.
              </div>
              <div>Turnaround time including production & shipping:</div>
              <ul>
                <li>Express shipping: 2&ndash;3 weeks</li>
                <li>Standard shipping: 4&ndash;5 weeks</li>
              </ul>
            </div>
          }
        >
          <span style={{ textDecoration: "underline dotted" }}>
            express shipping
          </span>
        </Tooltip>{" "}
        for?
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
      <ul>
        <li>
          <Typography variant="h5" fontSize={14}>
            Express shipping {Math.round(quantity * expressPercentage)} items:
            order now to receive by{" "}
            {moment().add(18, "day").toDate().toLocaleDateString()}
          </Typography>
        </li>
        <li>
          <Typography variant="h5" fontSize={14}>
            Standard shipping {Math.round(quantity * (1 - expressPercentage))}{" "}
            items: order now to receive by{" "}
            {moment().add(32, "day").toDate().toLocaleDateString()}
          </Typography>
        </li>
      </ul>
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
        <Box
          sx={{
            position: "absolute",
            top: 240,
            left: 162,
            color: "#333",
            border: "2px dotted #333",
            borderRadius: 2,
            p: 1,
            opacity: 0.75,
          }}
          className="animate__animated animate__pulse animate__repeat-3"
        >
          your logo here
        </Box>
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
        <PricingCalculator />
      </Box>
    </Container>
  );
}

function ProductMockupView({
  selectedVariant,
}: {
  selectedVariant: ProductVariant;
}): JSX.Element {
  const { showDemoAlert } = useSnackBar();
  return (
    <>
      <ProductMockupImageView url={selectedVariant.mockup_url} />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={showDemoAlert}
        sx={{ borderRadius: 8, textTransform: "uppercase", mt: 2 }}
      >
        Customize Now
      </Button>
      <Typography variant="h5" mt={2} mb={2} sx={{ fontWeight: 700 }}>
        + Specs & Details
      </Typography>
      <Box sx={{ pl: 2 }}>
        <Typography variant="body1" paragraph>
          Introducing our Cloud-Handled Ceramic Mug in Pastel Colors &ndash; the
          perfect addition to your morning routine or afternoon tea break! Made
          with high-quality ceramic material and featuring a unique cloud-shaped
          handle, this mug is both stylish and functional.
        </Typography>
        <Typography variant="body1" paragraph>
          But that&rsquo;s not all &ndash; with our full 360-degree color print
          customization option, you can make this mug truly your own. Choose
          your favorite design or create your own, and we&rsquo;ll bring it to
          life on your mug with vibrant, fade-resistant colors. And with our
          pastel color options, your mug will be a soft and calming addition to
          your collection.
        </Typography>
        <Typography variant="body1" paragraph>
          Not only does this mug look great, but it&rsquo;s also practical. Its
          generous 9.5-ounce size is perfect for your favorite hot or cold
          beverage, and its ceramic material provides excellent insulation to
          keep your drink at the perfect temperature for longer. Plus,
          it&rsquo;s dishwasher and microwave safe, making it easy to clean and
          use every day.
        </Typography>
        <Typography variant="body1" paragraph>
          Upgrade your mug game with our Cloud-Handled Ceramic Mug in Pastel
          Colors, fully customizable to fit your unique style and taste.
        </Typography>
        <ul>
          <li>Material: Porcelain Ceramic</li>
          <li>Size: 280ml/9.5 oz</li>
          <li>Dimension: 4 inch (H) x 4.7 inch (W)</li>
          <li>Weight: 500g</li>
          <li>Care Instructions: Dishwasher & Microwave safe</li>
        </ul>
      </Box>
    </>
  );
}

function ProductVariantView({ imageUrl }: { imageUrl: string }): JSX.Element {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={imageUrl}
        width="100%"
        style={{
          aspectRatio: "1/1",
          objectFit: "cover",
        }}
      />
    </Box>
  );
}

function ProductVariantsListView({
  productListing,
}: {
  productListing: ProductListing;
}): JSX.Element {
  return (
    <Box sx={{ overflowY: "scroll" }}>
      <Typography variant="h3" mb={2} fontSize={18}>
        Example Products
      </Typography>
      <Stack spacing={2}>
        {productListing.actual_images.map((url) => (
          <ProductVariantView key={url} imageUrl={url} />
        ))}
      </Stack>
    </Box>
  );
}

function DemoAlert(): JSX.Element {
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setOpen(false), 10000);
  }, []);
  return (
    <Box
      sx={{
        position: "fixed",
        top: 128,
        left: "50%",
        width: 600,
        transform: "translate(-50%, 0)",
      }}
    >
      <Slide direction="down" in={open}>
        <Alert severity="info">
          This is a demo of the product customizer. Other products will be
          available for customization when we launch in Q3 2023.
        </Alert>
      </Slide>
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
    <Container maxWidth="lg" sx={{ pt: 6, pb: 10 }}>
      <Grid container spacing={2}>
        <Grid
          item
          md={2}
          sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
        >
          <ProductVariantsListView productListing={productListing} />
        </Grid>
        <Grid item sm={12} md={5}>
          <ProductMockupView selectedVariant={selectedVariant} />
        </Grid>
        <Grid item sm={12} md={5}>
          <ProductDetailsView
            productListing={productListing}
            handleSelectColor={handleSelectColor}
          />
        </Grid>
      </Grid>
      <DemoAlert />
    </Container>
  );
}
