/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { decode } from "he";
import { Link } from "react-router-dom";
import { NewsletterSignUp } from "./components/NewsletterSignUp.js";
import { TeamSection } from "./components/TeamSection.js";

const DEMO_PRODUCT_CATEGORIES = [
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

const COMPANY_VALUES = [
  {
    title: "Customer First",
    description:
      "Our customers are at the center of everything we do. You want it? We can source it &ndash; our small but mighty team is ready to help you. Plus, our generative AI capabilities mean you can get the answers you need ASAP.",
    imageUrl: "/home/value-icons/crown.png",
  },
  {
    title: "Vetted Quality",
    description:
      "Enjoy our curated catalog of tried and tested products. We source globally from a large network of suppliers and manufacturers to ensure you get the best quality and the best price.",
    imageUrl: "/home/value-icons/starfish.png",
  },
  {
    title: "Seamless Experience",
    description:
      "Design your product, approve a mockup, and place your order within minutes using our self-serve platform. Then, keep easily track of your projects and order status with our integrated user dashboard.",
    imageUrl: "/home/value-icons/flower.png",
  },
];

function TopSection(): JSX.Element {
  return (
    <Box component="section" pt={4}>
      <Container
        maxWidth="lg"
        sx={{
          backgroundImage: "url(/home/top-background.png)",
          backgroundSize: "contain no-repeat",
          backgroundPosition: "bottom",
          borderRadius: 12,
          display: "flex",
          pt: 40,
          height: 575,
        }}
      >
        <Box sx={{ width: 472, mr: 20 }}>
          <Typography variant="h1" fontSize={60} lineHeight={1.5} ml={4} mt={2}>
            <div style={{ color: "#183439" }}>You dream it,</div>
            <div
              style={{
                backgroundColor: "#183439",
                color: "#FFFFFF",
                borderRadius: 60,
                padding: "0 0 0 20px",
              }}
            >
              we make it{" "}
              <span style={{ display: "inline-block" }}>
                <img src="/home/smiley.png" height={32} />
              </span>
            </div>
          </Typography>
        </Box>
        <Box sx={{ width: "40%" }}>
          <Typography variant="h3">
            Next-generation bespoke product sourcing with generative AI,
            connecting you to the best manufacturers worldwide
          </Typography>
          <Box sx={{ mt: 2, background: "#F7F7B6", borderRadius: 4, p: 2 }}>
            <Typography variant="h4" fontSize={16} mb={2}>
              Sign up and be the first to know when we launch:
            </Typography>
            <NewsletterSignUp />
          </Box>
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
          Quality, Speed, Value
        </Typography>
        <Typography variant="h3" fontSize={18} mx={10}>
          Discover unique products across multiple categories, from tech gadgets
          to packaging supplies, and get instant quotes
        </Typography>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          {DEMO_PRODUCT_CATEGORIES.map((category) => (
            <Grid item xs={6} sm={4} md={3} key={category.id}>
              <Card>
                <CardContent>
                  <Link to="/product/1">
                    <Box
                      component="img"
                      src={category.imageUrl}
                      sx={{ height: 160, maxWidth: 160, objectFit: "cover" }}
                    />
                  </Link>
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
      <Typography variant="body2" fontSize={13} px={4}>
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
        <Typography variant="h3" fontSize={18} mx={32} lineHeight={1.5}>
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
            <Button variant="contained" size="large" sx={{ borderRadius: 12 }}>
              Chat Now
            </Button>
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
              Hey there! We&rsquo;re USourced, a product sourcing agency and
              platform that&rsquo;s ready to transform the world of custom
              product sourcing.
            </Typography>
            <Typography variant="body1" paragraph>
              <b>Our mission</b> is to streamline access to unique, high-quality
              products across global suppliers and simplify supply change
              management. By harnessing the power of generative AI, we&rsquo;re
              making it easier and faster than ever to bring your brand vision
              into reality.
            </Typography>
            <Typography variant="body1" paragraph>
              It all started when our founder and CEO Julia Xu (formerly Chief
              of Staff at Alibaba) realized how difficult it was for small
              brands to source custom products. By bridging the gap between
              brand and manufacturer, she realized that she could open the door
              to easy and unlimited customization that&rsquo;s actually
              intuitive.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" paragraph>
              We launched USourced in 2022, offering white-glove services brands
              and creators looking to launch their brand via fully custom
              products. From design to sampling, packaging to global fulfillment
              &ndash; our small but mighty team is with you every step of the
              way.
            </Typography>
            <Typography variant="body1" paragraph>
              Don&rsquo;t just take our word for it, though &ndash; our clients
              include popular creators like Rebecca Zamolo and Philip DeFranco,
              as well as top brands like Disney and Camp.
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
  return (
    <Box component="main" sx={{ backgroundColor: "white" }}>
      <TopSection />
      <CatalogSection />
      <ValuesSection />
      <CustomSourcingSection />
      <AboutSection />
      <TeamSection />
    </Box>
  );
}
