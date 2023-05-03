import { Box, Container, Grid, Popover, Typography } from "@mui/material";
import * as React from "react";
import { useFirestoreImage } from "../../../core/firebase_utils.js";

type MemberProfile = {
  name: string;
  title: string;
  bio?: string;
};

const TEAM_MEMBERS = [
  {
    name: "Julia Xu",
    title: "Founder & CEO",
    bio: "Julia also founded the omni-channel e-commerce lifestyle brand Multitasky (as seen in Good Morning America, Forbes, Cosmopolitan & more), where she gathered deep experience in the e-commerce and supply chain industry. She previously served as the Chief of Staff of Alibaba.com North America, where she led global operations and strategy. Before that, she was part of Disney&apos;s Corporate Strategy team, where she built the global financial model for Disney+. She also founded a McKinsey-Women&apos;s-Impact-Award-winning social enterprise Tink Knit. Julia holds a Bachelor of Business-Economics & Sociology dual degree from Brown University.",
  },
  {
    name: "Frank Luan",
    title: "CTO",
    bio: "Frank is also a final-year PhD student focused on AI systems at UC Berkeley. He has received 2 ACM best paper awards, and holds the current world record for CloudSort, a big data benchmark. Prior to that, he developed generative-AI-based programming assistants at Meta AI Research. He co-founded SketchMe in 2015, a social app company that received $25M venture funding. Frank holds a Bachelor of Science in Computer Science and Statistics dual degree from the University of Chicago.",
  },
  {
    name: "Mandy Chow",
    title: "COO",
    bio: "Prior to joining USourced, Mandy was the Corporate Development Associate Director at Airwallex, where she led investments, and was also a core member of the fundraising team across its Series D, Series D2 Extension, and Series E ($5.5B valuation) rounds. Before that, she was in the TMT Investment Banking team at Goldman Sachs. Mandy holds a Bachelor of Science in Economics from The Wharton School of the University of Pennsylvania.",
  },
  {
    name: "Frances Feng",
    title: "CMO (Manufacturing)",
    bio: "Frances has 12+ years of experience in the manufacturing industry. She previously held various project leadership roles at Cricut, where she developed new international vendor resources and implemented strategic initiatives that drove significant revenue growth (from $2M to $300M in 3 years). Frances holds a Bachelor of Business English from Guangdong University of Finances and Economics and is an active member of Project Management Professional (PMP).",
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

function TeamMemberCard({ member }: { member: MemberProfile }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { image } = useFirestoreImage({
    path: `/usourced/team/${member.name.split(" ")[0]}.jpg`,
  });

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const profileEl = (
    <Box
      component="img"
      src={image ?? DEFAULT_PROFILE_IMAGE_URL}
      sx={{ height: 160, maxWidth: 160, borderRadius: 80 }}
    />
  );

  const wrappedProfileEl = member.bio ? (
    <>
      <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        {profileEl}
      </Box>
      <Popover
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box width={400}>
          <Typography variant="body1" paragraph sx={{ m: 2 }}>
            {member.bio}
          </Typography>
        </Box>
      </Popover>
    </>
  ) : (
    profileEl
  );

  return (
    <Grid item xs={12} sm={6} md={3} key={member.name}>
      <Box>
        {wrappedProfileEl}
        <Typography variant="h5">{member.name}</Typography>
        <Typography variant="body2" color="#6D7F83">
          {member.title}
        </Typography>
      </Box>
    </Grid>
  );
}

export function TeamSection(): JSX.Element {
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundImage:
          "url(/home/background/green-1.svg),url(/home/background/green-2.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom 200px left 0px, top 100px right 0px",
        backgroundSize: "20vw",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h1" fontSize={48} mb={4}>
          Meet the Team
        </Typography>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard member={member} key={member.name} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
