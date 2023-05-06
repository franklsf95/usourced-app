import { LinkedIn } from "@mui/icons-material";
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { decode } from "he";
import { TransitionProps } from "notistack";
import * as React from "react";
import { useFirestoreImage } from "../../../core/firebase_utils.js";

type MemberProfile = {
  name: string;
  title: string;
  bio?: string;
  linkedin_url?: string;
};

const TEAM_MEMBERS = [
  {
    name: "Julia Xu",
    title: "Founder & CEO",
    bio: "Julia Xu is the CEO of USourced. She also founded the omni-channel e-commerce lifestyle brand Multitasky (as seen in Good Morning America, Forbes, Cosmopolitan & more), where she gathered deep experience in the e-commerce and supply chain industry. She previously served as the Chief of Staff of Alibaba.com North America, where she led global operations and strategy. Before that, she was part of Disney&rsquo;s Corporate Strategy team, where she built the global financial model for Disney+. She also founded a McKinsey-Women&rsquo;s-Impact-Award-winning social enterprise Tink Knit. Julia holds a Bachelor of Business-Economics & Sociology dual degree from Brown University.",
    linkedin_url: "https://www.linkedin.com/in/julialxu/",
  },
  {
    name: "Frank Luan",
    title: "Co-Founder & CTO",
    bio: "Frank Sifei Luan is the CTO of USourced. He is also a final-year PhD student focused on AI systems at UC Berkeley. He has received 2 ACM best paper awards, and holds the current world record for CloudSort, a big data benchmark. Prior to that, he developed generative-AI-based programming assistants at Meta AI Research. He co-founded SketchMe in 2015, a social app company that received $25M venture funding. Frank holds a Bachelor of Science in Computer Science and Statistics dual degree from the University of Chicago.",
    linkedin_url: "https://www.linkedin.com/in/franklsf95/",
  },
  {
    name: "Mandy Chow",
    title: "Co-Founder & COO",
    bio: "Mandy Chow is the COO of USourced. Prior to joining USourced, Mandy was the Corporate Development Associate Director at Airwallex, where she led investments, and was also a core member of the fundraising team across its Series D, Series D2 Extension, and Series E ($5.5B valuation) rounds. Before that, she was in the TMT Investment Banking team at Goldman Sachs. Mandy holds a Bachelor of Science in Economics from The Wharton School of the University of Pennsylvania.",
    linkedin_url: "https://www.linkedin.com/in/mandy-chow-03463571/",
  },
  {
    name: "Frances Feng",
    title: "Co-Founder & CMO (Manufacturing)",
    bio: "Frances Feng is the CMO (Manufacturing) of USourced. Frances has 12+ years of experience in the manufacturing industry. She previously held various project leadership roles at Cricut, where she developed new international vendor resources and implemented strategic initiatives that drove significant revenue growth (from $2M to $300M in 3 years). Frances holds a Bachelor of Business English from Guangdong University of Finances and Economics and is an active member of Project Management Professionals (PMP).",
    linkedin_url: "https://www.linkedin.com/in/frances-feng-b815896a/",
  },
  {
    name: "Kelly Luc",
    title: "Marketing Director",
    bio: "Kelly Luc is the Marketing Director of Usourced. Prior to this role, she was a Senior Content Marketing Manager at Culture Amp, and the Chief Creative Officer at Multitasky. She also served as a teaching fellow in Tokyo, Japan through the Princeton in Asia fellowship program. Kelly graduated from Brown University with a B.A. in Public Health and Visual Arts.",
  },
  {
    name: "Megan Williams",
    title: "Client & Project Manager",
    bio: "Megan Williams is the Operations Manager at USourced. Prior to joining USourced, Megan worked in the real estate industry selling vacation condos, to eventually break the company record as top sales producer at the Westgate Las Vegas Resort & Casino for several consecutive months. With 8 years of experience in sales & client relations, Megan continues to share her personable skills with our clients at USourced. Megan is currently studying Business Management and is certified with the Google Project Management Certification.",
  },
  {
    name: "Mary Helen Wise",
    title: "Partnership Manager",
    bio: "Mary Helen Wise is the Partnership Director of USourced. Prior to USourced, Mary Helen oversaw investment funding efforts for Summit Ridge Energy, where she also developed a platform for project procurement and scaling. She began at Multitasky in November of 2021 and led the influencer partnership program, and she has since become Chief of Staff at Multitasky. Mary Helen holds a Bachelor of Engineering in Chemical Engineering from Vanderbilt University.",
  },
  {
    name: "Corina Ivy Spi",
    title: "Content & Warehouse Manager",
    bio: "Corina is the content and Warehouse Manager at USourced, boasting a proven track record in e-commerce and business development. Prior to her current role at USourced, she joined Multitasky in 2020 as an Operations Manager and Content Creator. Drawing on her experience from managing her own e-commerce store, Corina has honed her industry expertise, demonstrating versatility and a commitment to excellence. Her hands-on experience and entrepreneurial spirit continue to contribute significantly to the growth and success of both companies.",
  },
  {
    name: "Sabrina Feng",
    title: "Program Director",
    bio: "Sabrina Feng is the Program Director at USourced. Sabrina has 14 years of experience in product development and project management, working in various industries including food, maternity/baby products, toys, and several others. With her experience in leading and implementing projects across multiple categories, she facilitated a $2 million project landing during her tenure at Cricut. While at Mattel, she led a project that won the “Toy of the Year” (TOTY) award in 2016, as well as the TRU Best Selling Toy Award. Sabrina holds a bachelor's degree in Business English from Guangdong University of Foreign Studies, and is also an active member of the Project Management Professional (PMP).",
  },
  {
    name: "Rachel Xia",
    title: "Senior Buyer / Sourcer",
    bio: "Rachel Xia is a Procurement Specialist at USourced. With nearly 9 years of experience in procurement and 5 years of experience working in practical supply chain management, she has utilized her skills in multiple industries including manufacturing, trade, and cross-border e-commerce. As an all-around procurement expert with abundant industry resources, she uses her strong business negotiation and team management skills to provide exceptional results at USourced. Prior to joining USourced, Rachel worked as a procurement manager at Shenzhen Yiomatech Co., Ltd., where she established supplier management strategies, procurement management systems, and saved the company nearly 3 million RMB in costs during her tenure. Rachel holds a bachelor's degree from Wuhan University of Engineering.",
  },
  {
    name: "Samlly He",
    title: "Supply Chain Manager",
    bio: "Samlly is the Logistics Operations Manager at USourced. Samlly has 9 years of logistics experience and 2 years of project management experience. Prior to joining USourced, she worked in the engineering & research department at Mattel Toy, serving as a secretary and project manager. Samlly holds an associate degree in international trade from South China University of Technology and has obtained a Junior Accountant Certification.",
  },
  {
    name: "Angelina Ge",
    title: "Project Manager",
    bio: "Angelina is a Project Manager at USourced. Angelina has over 11 years of experience in the custom sourcing industry across multiple categories giving her rich practical and management experience. Prior to joining USourced, she held a key account manager position at Shaigoo Limited, where she handled individual projects worth up to 5 million RMB. Angelina holds a Bachelor's Degree from Yangtze University.",
  },
  {
    name: "Jerry Huang",
    title: "Operations Lead",
    bio: "Jerry is a Purchasing Assistant and the Head of our China Warehouse at USourced. Prior to joining USourced, Jerry worked in the cross-border logistics industry, giving him experience in coordinating storage and transportation of completed goods. Jerry brought his expertise to Multitasky in September 2020, and has been a vital asset to our team since.",
  },
  {
    name: "Bruce Yao",
    title: "Quality Control & Compliance Professional",
    bio: "Bruce Yao is an accomplished professional in quality control and compliance, with more than 18 years of experience in the consumer goods industry. Currently, he serves as a compliance consultant at USourced, located in Shenzhen. His previous roles include leading the first Wrist-Based heart smartwatch compliance project at SGS and ITS. He has also collaborated with DIT Guangzhou/Beijing (Department for International Trade) & CBBC (China-Britain Business Council) to deliver a speech and share CN local requirements to UK consumer products producers in Shanghai, promoting trade exchanges and cooperation between the UK and China. Bruce graduated from the University of Shenzhen and is an active member of PMP.",
  },
];

const DEFAULT_PROFILE_IMAGE_URL = "/home/silhouette.png";

function TeamMemberCard({ member }: { member: MemberProfile }) {
  const { image } = useFirestoreImage({
    path: `/usourced/team/${member.name.split(" ")[0]}.jpg`,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid item xs={12} sm={6} md={3} key={member.name}>
      <Tooltip title="Click to view bio" placement="top" arrow>
        <Box
          onClick={handleOpen}
          sx={{
            cursor: "pointer",
            "&:hover": {
              animation: "pulse 0.5s",
            },
          }}
        >
          <Box
            component="img"
            src={image ?? DEFAULT_PROFILE_IMAGE_URL}
            sx={{ height: 160, maxWidth: 160, borderRadius: 80 }}
          />
          <Typography variant="h5">{member.name}</Typography>
          <Typography variant="body2" color="#6D7F83">
            {member.title}
          </Typography>
        </Box>
      </Tooltip>
      <TeamMemberDetailDialog
        member={member}
        memberImage={image}
        open={open}
        handleClose={handleClose}
      />
    </Grid>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function TeamMemberDetailDialog({
  member,
  memberImage,
  open,
  handleClose,
}: {
  member: MemberProfile;
  memberImage: string | null;
  open: boolean;
  handleClose: () => void;
}): JSX.Element {
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          position: "fixed",
          bottom: 0,
          right: 0,
          maxWidth: "sm",
          height: "100vh",
        },
      }}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogContent
        sx={{
          textAlign: "center",
          pt: 10,
          backgroundImage: "url(/home/about-background.svg)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          component="img"
          src={memberImage ?? DEFAULT_PROFILE_IMAGE_URL}
          sx={{ height: 160, maxWidth: 160, borderRadius: 80 }}
        />
        <Typography variant="h2">{member.name}</Typography>
        <Typography variant="body2" color="#6D7F83">
          {member.title}
        </Typography>
        {member.bio && (
          <Box mt={4} px={4}>
            <Typography
              variant="body1"
              textAlign="left"
              borderTop="1px solid #ccc"
              pt={2}
            >
              {decode(member.bio)}
            </Typography>
          </Box>
        )}
        {member.linkedin_url && (
          <a
            href={member.linkedin_url}
            style={{
              display: "block-inline",
              position: "relative",
              bottom: -8,
              color: "inherit",
            }}
          >
            <LinkedIn />
          </a>
        )}
      </DialogContent>
    </Dialog>
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
