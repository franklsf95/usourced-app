/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { decode } from "he";
import { Link } from "react-router-dom";
import { RouterLink } from "../../common/RouterLink.js";
import { usePageEffect } from "../../core/page.js";
import { NewsletterSignUp } from "./components/NewsletterSignUp.js";
import { TeamSection } from "./components/TeamSection.js";

const DEMO_PRODUCT_CATEGORIES = [
  {
    id: "1",
    name: "Apparel & Accessories",
    imageUrl: "/home/categories/1.png",
  },
  {
    id: "2",
    name: "Home & Lifestyle",
    imageUrl: "/home/categories/2.png",
  },
  {
    id: "3",
    name: "Office Supplies",
    imageUrl: "/home/categories/3.png",
  },
  {
    id: "4",
    name: "Packaging & Prints",
    imageUrl: "/home/categories/4.png",
  },
  {
    id: "5",
    name: "Tech & Gadgets",
    imageUrl: "/home/categories/5.png",
  },
  {
    id: "6",
    name: "Toys & Games",
    imageUrl: "/home/categories/6.png",
  },
  {
    id: "7",
    name: "New Arrivals",
    imageUrl: "/home/categories/7.png",
  },
  {
    id: "8",
    name: "Shop All",
    imageUrl: "/home/categories/8.png",
  },
];

const COMPANY_VALUES = [
  {
    title: "Customer First",
    description:
      "Our customers are at the center of everything we do. You want it? We can source it &ndash; our small but mighty team is ready to help you. Plus, our generative AI capabilities mean you can get the answers you need ASAP.",
    imageUrl: "/home/value-icons/customer.svg",
  },
  {
    title: "Vetted Quality",
    description:
      "Enjoy our curated catalog of tried and tested products. We source globally from a large network of suppliers and manufacturers to ensure you get the best quality and the best price.",
    imageUrl: "/home/value-icons/quality.svg",
  },
  {
    title: "Seamless Experience",
    description:
      "Design your product, approve a mockup, and place your order within minutes using our self-serve platform. Then, easily keep track of your projects and order status with our integrated user dashboard.",
    imageUrl: "/home/value-icons/steps.svg",
  },
];

function TopSection(): JSX.Element {
  return (
    <Box component="section" pt={1}>
      <Container
        maxWidth="lg"
        sx={{
          backgroundImage: "url(/home/top-background.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          display: "flex",
          pt: 44,
          height: 740,
          color: "white",
        }}
      >
        <Box sx={{ width: 552, mr: 20 }}>
          <Typography variant="h1" fontSize={60} lineHeight={1.5} ml={4}>
            <div style={{ color: "primary" }}>YOU DREAM IT,</div>
            <div
              style={{
                backgroundColor: "white",
                color: "#183439",
                borderRadius: 60,
                padding: "0 0 0 20px",
              }}
            >
              WE MAKE IT{" "}
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  bottom: -10,
                }}
              >
                <img src="/home/smiley.svg" height={64} />
              </span>
            </div>
          </Typography>
        </Box>
        <Box sx={{ width: 400 }}>
          <Typography variant="h3" sx={{ fontSize: 30, fontWeight: 300 }}>
            Next-generation bespoke product sourcing with generative AI,
            connecting you to the best manufacturers worldwide
          </Typography>
        </Box>
      </Container>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: -20,
        }}
      >
        <Box
          sx={{
            background: "#F7F7B6",
            borderRadius: 4,
            px: 4,
            py: 2,
            width: 440,
          }}
        >
          <Typography variant="h4" fontSize={16} mb={2}>
            Sign up and be the first to know when we launch:
          </Typography>
          <NewsletterSignUp />
        </Box>
      </Container>
    </Box>
  );
}

function CatalogSection(): JSX.Element {
  return (
    <Box
      component="section"
      sx={{
        pt: 8,
        pb: 12,
        backgroundImage:
          "url(/home/background/orange-1.svg), url(/home/background/orange-2.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom 200px left 0px, top 100px right 0px",
        backgroundSize: "20vw",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h1" fontSize={48} mb={4}>
          Quality, Speed, Value
        </Typography>
        <Typography variant="h3" fontSize={20} fontWeight={300} mx={15}>
          Discover unique products across multiple categories, from tech gadgets
          to packaging supplies, and get instant quotes
        </Typography>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {DEMO_PRODUCT_CATEGORIES.map((category) => (
            <Grid item xs={6} sm={4} md={3} key={category.id}>
              <Box>
                <Link to="/products/1">
                  <Box
                    component="img"
                    src={category.imageUrl}
                    sx={{ height: 160, maxWidth: 160, objectFit: "contain" }}
                  />
                </Link>
                <Typography variant="h2" fontSize={16}>
                  {category.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function ValueCard({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}): JSX.Element {
  return (
    <Box>
      <Box
        component="img"
        src={imageUrl}
        sx={{ height: 100, maxWidth: 100, my: 2 }}
      />
      <Typography variant="h2" fontSize={18} mb={2}>
        {title}
      </Typography>
      <Typography variant="h3" fontSize={13} px={4}>
        {decode(description)}
      </Typography>
    </Box>
  );
}

function ValuesSection(): JSX.Element {
  return (
    <Box component="section">
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          backgroundImage: "url(/home/blue-background.svg)",
          backgroundSize: "contain no-repeat",
          borderRadius: 12,
          pb: 10,
        }}
      >
        <Box>
          <img
            src="/home/usourced-seal.png"
            width={100}
            style={{ position: "relative", top: -48 }}
          />
        </Box>
        <Typography variant="h1" fontSize={48} mb={4}>
          Our Promise
        </Typography>
        <Typography variant="h3" fontSize={18} mx={20} lineHeight={1.5}>
          Next-generation bespoke product sourcing with generative AI,
          connecting you to the best manufacturers worldwide
        </Typography>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          {COMPANY_VALUES.map((value) => (
            <Grid item xs={12} sm={6} md={4} key={value.title}>
              <ValueCard {...value} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function CustomSourcingSection(): JSX.Element {
  return (
    <Box
      component="section"
      sx={{
        backgroundImage: "url(/home/star34.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          mt: 10,
        }}
      >
        <Box
          component="img"
          src="/home/we-source-it.png"
          sx={{ height: 400, float: "right", ml: 18 }}
        />
        <Box>
          <Typography variant="h1" fontSize={48} mb={4}>
            Want it?
            <br />
            We&apos;ll source it.
          </Typography>
          <Typography variant="h5" fontSize={16} paragraph>
            Can&rsquo;t find exactly what you&rsquo;re looking for? Don&rsquo;t
            worry &ndash; we got you.
          </Typography>
          <Typography variant="h5" fontSize={16} paragraph>
            Whether you want to source a product not on our website, or simply
            want to make a few tweaks to an existing product, USourced can help.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              component={RouterLink}
              variant="contained"
              href="/ai-designer"
              color="primary"
              children="Chat now"
              sx={{ fontSize: 20, borderRadius: 12 }}
            />
            <Box>
              <img
                src="/home/chat-with-ai.png"
                style={{
                  float: "left",
                  position: "relative",
                  top: -30,
                  left: 120,
                  height: 90,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function AboutSection(): JSX.Element {
  return (
    <Box
      component="section"
      sx={{
        pt: 16,
        backgroundImage: "url(/home/about-background.svg)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h1" fontSize={48} mb={4}>
          <span style={{ display: "inline-block" }}>
            <img src="/home/star.png" height={32} />
          </span>{" "}
          About USourced{" "}
          <span style={{ display: "inline-block" }}>
            <img src="/home/star.png" height={32} />
          </span>
        </Typography>
        <Grid container spacing={2} sx={{ textAlign: "left" }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" paragraph>
              Hey there! We&rsquo;re USourced, a product sourcing platform
              that&rsquo;s ready to transform the world of custom product
              sourcing.
            </Typography>
            <Typography variant="body1" paragraph>
              <b>Our mission</b> is to streamline access to unique, high-quality
              products across global suppliers and simplify supply chain
              management. By harnessing the power of generative AI, we&rsquo;re
              making it easier and faster than ever to bring your brand vision
              into reality.
            </Typography>
            <Typography variant="body1" paragraph>
              It all started when our founder Julia Xu realized how difficult it
              was for small brands to source custom products. By bridging the
              gap between brand and manufacturer, she realized that she could
              open the door to easy and unlimited customization that&rsquo;s
              actually intuitive.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" paragraph>
              We launched USourced in 2022, offering white-glove services to
              clients looking to launch their brand via fully custom products.
              From design to sampling, packaging to global fulfillment &ndash;
              our small but mighty team is with you every step of the way.
            </Typography>
            <Typography variant="body1" paragraph>
              <b>If you can dream it, we can make it</b>. With USourced, you can
              say goodbye to the hassle of traditional product sourcing, and
              hello to easy and automated custom product sourcing.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function HomePage(): JSX.Element {
  usePageEffect({
    title:
      "USourced - Generative AI-powered Global Product Sourcing Platform and Marketplace",
  });
  return (
    <Box component="main">
      <TopSection />
      <CatalogSection />
      <ValuesSection />
      <CustomSourcingSection />
      <AboutSection />
      <TeamSection />
    </Box>
  );
}
