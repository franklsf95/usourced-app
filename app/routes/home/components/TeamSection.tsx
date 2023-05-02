import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Container,
  Grid,
  IconButton,
  IconButtonProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getDownloadURL, ref } from "firebase/storage";
import * as React from "react";
import { storage } from "../../../core/firebase.js";

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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMoreButton = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function TeamMemberCard({
  member,
  bioExpanded,
  setBioExpanded,
}: {
  member: MemberProfile;
  bioExpanded: boolean;
  setBioExpanded: (value: boolean) => void;
}) {
  const handleExpandClick = () => {
    setBioExpanded(!bioExpanded);
  };

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
      <Card>
        <CardContent sx={{ pb: 0 }}>
          <Box
            component="img"
            src={imageUrl}
            sx={{ height: 160, maxWidth: 160, borderRadius: 80 }}
          />
          <Typography variant="h5">{member.name}</Typography>
          <Typography variant="body2" color="#6D7F83">
            {member.title}
          </Typography>
        </CardContent>
        {member.bio && (
          <>
            <CardActions sx={{ p: 0 }}>
              <ExpandMoreButton
                expand={bioExpanded}
                onClick={handleExpandClick}
              >
                <ExpandMore />
              </ExpandMoreButton>
            </CardActions>
            <Collapse in={bioExpanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{member.bio}</Typography>
              </CardContent>
            </Collapse>
          </>
        )}
      </Card>
    </Grid>
  );
}

export function TeamSection(): JSX.Element {
  const [bioExpanded, setBioExpanded] = React.useState<boolean>(false);
  return (
    <Box component="section" sx={{ py: 8 }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h1" fontSize={48} mb={4}>
          Meet the Team
        </Typography>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard
              member={member}
              key={member.name}
              bioExpanded={bioExpanded}
              setBioExpanded={setBioExpanded}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
