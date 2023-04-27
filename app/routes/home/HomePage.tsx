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
import { getDownloadURL, ref } from "firebase/storage";
import * as React from "react";
import { storage } from "../../core/firebase.js";
import { NewsletterSignUp } from "./components/NewsletterSignUp.js";

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
    imageUrl: "/home/value-icons/diamond.png",
  },
  {
    title: "Vetted Quality",
    description:
      "Enjoy our curated catalog of tried and tested products. We source globally from a large network of suppliers and manufacturers to ensure you get the best quality and the best price.",
    imageUrl: "/home/value-icons/price-tag.png",
  },
  {
    title: "Seamless Experience",
    description:
      "Design your product, approve a mockup, and place your order within minutes using our self-serve platform. Then, keep easily track of your projects and order status with our integrated user dashboard.",
    imageUrl: "/home/value-icons/steps.png",
  },
];

type MemberProfile = {
  name: string;
  title: string;
};

const TEAM_MEMBERS = [
  {
    name: "Julia Xu",
    title: "Founder & CEO",
  },
  {
    name: "Frank Luan",
    title: "CTO",
  },
  {
    name: "Mandy Chow",
    title: "COO",
  },
  {
    name: "Frances Feng",
    title: "CMO",
  },
  {
    name: "Kelly Luc",
    title: "Marketing Director",
  },
  {
    name: "Megan Williams",
    title: "Client & Project Manager",
  },
  {
    name: "Mary Helen Wise",
    title: "Partnership Manager",
  },
  {
    name: "Corina Ivy Spi",
    title: "Content & Warehouse Manager",
  },
  {
    name: "Sabrina Feng",
    title: "Program Director",
  },
  {
    name: "Rachel Xia",
    title: "Senior Buyer / Sourcer",
  },
  {
    name: "Angelina Ge",
    title: "Project Manager",
  },
  {
    name: "Samlly He",
    title: "Supply Chain Manager",
  },
];

const DEFAULT_PROFILE_IMAGE_URL = "/home/silhouette.png";

function TopSection(): JSX.Element {
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
          <NewsletterSignUp />
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
    <Card sx={{ height: 400 }}>
      <CardContent>
        <Box
          component="img"
          src={imageUrl}
          sx={{ height: 120, maxWidth: 120, my: 2 }}
        />
        <Typography variant="h3" mb={2}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}

function ValuesSection(): JSX.Element {
  return (
    <Box component="section" sx={{ py: 16, backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h1" fontSize={48} mb={4}>
          Our Promise
        </Typography>
        <Typography variant="h2">
          Next-generation bespoke product sourcing with generative AI,
          connecting you to the best manufacturers worldwide
        </Typography>
        <Grid container spacing={2} sx={{ mt: 8 }}>
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
    <Box component="section">
      <Container maxWidth="md">
        <Grid container spacing={0}>
          <Grid item xs={6} my={8} ml={-4} mr={8}>
            <Typography variant="h1" fontSize={32} mb={4}>
              You want it? We source it.
            </Typography>
            <Typography variant="body1" paragraph>
              Can&rsquo;t find exactly what you&rsquo;re looking for?
              Don&rsquo;t worry &ndash; we got you.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you want to source a product not on our website, or simply
              want to make a few tweaks to an existing product, USourced can
              help. Just click the button below to start the conversation.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" size="large">
                Chat Now
              </Button>
            </Box>
          </Grid>
          <Grid item xs={4} height={466}>
            <Box
              component="img"
              src="/home/desk.jpg"
              sx={{ height: 466, width: 466 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function AboutSection(): JSX.Element {
  return (
    <Box component="section" sx={{ py: 16, backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h1" fontSize={48} mb={4}>
          About USourced
        </Typography>
        <Typography variant="body1" paragraph>
          Hey there! We&rsquo;re USourced, a product sourcing agency and
          platform that&rsquo;s ready to transform the world of custom product
          sourcing.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to streamline access to unique, high-quality products
          across global suppliers and simplify supply change management. By
          harnessing the power of generative AI, we&rsquo;re making it easier
          and faster than ever to bring your brand vision into reality.
        </Typography>
        <Typography variant="body1" paragraph>
          It all started when our Founder and CEO Julia Xu (formerly Chief of
          Staff at Alibaba) realized how difficult it was for small brands to
          source custom products. By bridging the gap between brand and
          manufacturer, she realized that she could open the door to easy and
          unlimited customization that&rsquo;s actually intuitive.
        </Typography>
        <Typography variant="body1" paragraph>
          We launched USourced in 2022, offering white-glove services brands and
          creators looking to launch their brand via fully custom products. From
          design to sampling, packaging to global fulfillment &ndash; our small
          but mighty team is with you every step of the way.
        </Typography>
        <Typography variant="body1" paragraph>
          Don&rsquo;t just take our word for it, though &ndash; our clients
          include popular creators like Rebecca Zamolo and Philip DeFranco, as
          well as top brands like Disney and Camp.
        </Typography>
        <Typography variant="body1" paragraph>
          If you can dream it, we can make it. With USourced, you can say
          goodbye to the hassle of traditional product sourcing, and hello to
          easy and automated custom product sourcing.
        </Typography>
      </Container>
    </Box>
  );
}

async function fetchProfileImageUrl(
  member: MemberProfile,
): Promise<string | null> {
  const path = `/usourced/team/${member.name.split(" ")[0]}.jpg`;
  try {
    return await getDownloadURL(ref(storage, path));
  } catch (e) {
    return null;
  }
}

function TeamMemberCard({ member }: { member: MemberProfile }): JSX.Element {
  const [imageUrl, setImageUrl] = React.useState<string>(
    DEFAULT_PROFILE_IMAGE_URL,
  );
  React.useEffect(() => {
    async function effect() {
      const url = await fetchProfileImageUrl(member);
      if (url) {
        setImageUrl(url);
      }
    }
    effect();
  }, [member]);
  return (
    <Grid item xs={12} sm={6} md={3} key={member.name}>
      <Card sx={{ height: 260 }}>
        <CardContent>
          <Box
            component="img"
            src={imageUrl}
            sx={{ height: 160, maxWidth: 160 }}
          />
          <Typography variant="h5">{member.name}</Typography>
          <Typography variant="body2">{member.title}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

function TeamSection(): JSX.Element {
  return (
    <Box component="section" sx={{ py: 8 }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h1" fontSize={48} mb={4}>
          Meet the Team
        </Typography>
        <Grid container spacing={2} sx={{ mt: 8 }}>
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard member={member} key={member.name} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default function HomePage(): JSX.Element {
  return (
    <>
      <TopSection />
      <CatalogSection />
      <ValuesSection />
      <CustomSourcingSection />
      <AboutSection />
      <TeamSection />
    </>
  );
}
