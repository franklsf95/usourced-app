import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useFirestoreImage } from "../../../core/firebase_utils.js";
import { useSnackBar } from "../../../layout/components/SnackBarContext.js";
import { DemoProject, demo_projects } from "../../../models/demo_projects.js";
import { ProjectStatus } from "../../../models/projects.js";
import { RouterLink } from "../../RouterLink.js";
import { AI_AGENT, CURRENT_USER, ChatMessage } from "../ChatProvider.js";

function newMessage(
  text: string,
  is_ai: boolean,
  payload?: JSX.Element,
): ChatMessage {
  return {
    id: Math.random().toString(),
    text,
    createdAt: moment().toDate(),
    from: is_ai ? AI_AGENT : CURRENT_USER,
    payload,
  };
}

function ProjectCardView({ project }: { project: DemoProject }): JSX.Element {
  const { showDemoAlert } = useSnackBar();
  const DEFAULT_PROJECT_IMAGE_URL = "/home/box-silhouette.png";
  const { image } = useFirestoreImage({
    path: `/usourced/demo/projects/${project.projectName}.png`,
  });
  return (
    <Card
      sx={{
        width: 240,
        my: 1,
      }}
    >
      <CardMedia
        component="img"
        image={image ?? DEFAULT_PROJECT_IMAGE_URL}
        alt={project.projectName}
        sx={{ p: 2, height: 200, objectFit: "contain" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h3" fontSize={16} fontWeight={600}>
          {project.projectName}
        </Typography>
        <Typography variant="body1" fontSize={14}>
          Sampling Fee: $200.00
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button variant="contained" onClick={showDemoAlert}>
          Pay Invoice
        </Button>
      </CardActions>
    </Card>
  );
}
export const messages = [
  newMessage("Hi Julia, how can I help you today?", true),
  newMessage(
    "I was just wondering when all the bulk production items can be shipped out by?",
    false,
  ),
  newMessage(
    "Sure! See below a summary of estimated production completion dates for items in bulk production now:",
    true,
    <Card sx={{ maxWidth: "80%" }}>
      <CardContent>
        <Box sx={{ mb: -2 }}>
          {demo_projects[ProjectStatus.InBulkProduction].map((project) => (
            <Typography key={project.id} variant="body2" gutterBottom>
              <RouterLink
                href={`/projects/{project.id}`}
                style={{ fontWeight: 600, color: "black" }}
              >
                {project.projectName}
              </RouterLink>
              : {project.inquiryDate.toLocaleDateString()}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>,
  ),
  newMessage(
    "Do you also have tracking for the production that’s been shipped?",
    false,
  ),
  newMessage(
    "Of course! See below a summary of tracking numbers and estimated delivery dates for the items shipped:",
    true,
    <Card sx={{ maxWidth: "80%" }}>
      <CardContent>
        <Box sx={{ mb: -2 }}>
          {demo_projects[ProjectStatus.ProductionShipped].map((project) => (
            <Typography key={project.id} variant="body2" gutterBottom>
              <RouterLink
                href={`/projects/{project.id}`}
                style={{ fontWeight: 600, color: "black" }}
              >
                {project.projectName}
              </RouterLink>
              : #{Math.round(Math.random() * Math.pow(10, 10))}, delivery by{" "}
              {moment().add(7, "day").toDate().toLocaleDateString()}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>,
  ),
  newMessage(
    "Great! And how are we doing on adjusting the flower earring samples?",
    false,
  ),
  newMessage(
    "The factory is currently working on the adjustments. Last time you mentioned to change the print pattern, so they are resampling that right now. We are on track to finish by " +
      moment().add(7, "day").toDate().toLocaleDateString() +
      ", and will notify you with new sample photos then!",
    true,
  ),
  newMessage(
    "Cool. Oh also let's start sampling for the baseball cap, I just got approval.",
    false,
  ),
  newMessage(
    "That's great to hear! You can pay the sample invoice here whenever you're ready, and we will start sampling right away!",
    true,
    <ProjectCardView project={demo_projects[ProjectStatus.SentQuotes][0]} />,
  ),
];
