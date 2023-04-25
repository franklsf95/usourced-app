/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Send } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

type ProductCategory = {
  id: string;
  name: string;
  imageUrl: string;
};

const DEMO_PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "1",
    name: "Apparel & Accessories",
    imageUrl: "/home/1.png",
  },
  {
    id: "2",
    name: "Home Goods",
    imageUrl: "/home/2.png",
  },
  {
    id: "3",
    name: "Office Supplies",
    imageUrl: "/home/3.png",
  },
  {
    id: "4",
    name: "Packaging & Prints",
    imageUrl: "/home/4.png",
  },
  {
    id: "5",
    name: "Tech & Gadgets",
    imageUrl: "/home/5.png",
  },
  {
    id: "6",
    name: "Toys & Games",
    imageUrl: "/home/6.png",
  },
  {
    id: "7",
    name: "New Arrivals",
    imageUrl: "/home/7.png",
  },
  {
    id: "8",
    name: "Shop All",
    imageUrl: "/home/8.png",
  },
];

function FirstSection(): JSX.Element {
  const emailInputId = "demo-signup-email-input";
  return (
    <Box component="section" sx={{ py: 16, backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h1" fontSize={72} mb={4}>
          Quality, Speed, Value
        </Typography>
        <Typography variant="h2">
          Next-generation bespoke product sourcing with generative AI,
          connecting you to the best manufacturers worldwide
        </Typography>
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" mb={2}>
            Sign up and be the first to know when we launch
          </Typography>
          <FormControl sx={{ width: "25ch" }} variant="outlined">
            <InputLabel htmlFor={emailInputId}>Email</InputLabel>
            <OutlinedInput
              id={emailInputId}
              autoComplete="email"
              type="email"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Send />
                  </IconButton>
                </InputAdornment>
              }
              label="Email"
            />
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
}

function CatalogSection(): JSX.Element {
  return (
    <Box component="section" sx={{ py: 16 }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h1" fontSize={48} mb={4}>
          You dream it, we make it
        </Typography>
        <Typography variant="h2">
          Discover unique products across multiple categories, from tech gadgets
          to packaging supplies, and get instant quotes
        </Typography>
        <Grid container spacing={2} sx={{ mt: 8 }}>
          {DEMO_PRODUCT_CATEGORIES.map((category) => (
            <Grid item xs={6} sm={4} md={3} key={category.id}>
              <Card>
                <CardContent>
                  <Box
                    component="img"
                    src={category.imageUrl}
                    sx={{ height: 160, maxWidth: 160 }}
                  />
                  <Typography variant="h5">{category.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default function HomePage(): JSX.Element {
  return (
    <>
      <FirstSection />
      <CatalogSection />
    </>
  );
}
