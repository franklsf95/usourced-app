import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { RouterLink } from "../../../common/RouterLink.js";
import { useFirestoreImage } from "../../../core/firebase_utils.js";
import { DemoProject } from "../../../models/demo_projects.js";

const DEFAULT_PROJECT_IMAGE_URL = "/home/box-silhouette.png";

export function ProjectCardView({
  project,
}: {
  project: DemoProject;
}): JSX.Element {
  const { image } = useFirestoreImage({
    path: `/usourced/demo/projects/${project.projectName}.png`,
  });
  return (
    <Card
      sx={{
        width: 240,
        mx: "auto",
        my: 1,
      }}
    >
      <CardActionArea component={RouterLink} href={`/projects/${project.id}`}>
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
            Inquired on {project.inquiryDate.toLocaleDateString()}
          </Typography>
          <Typography variant="body1" fontSize={14}>
            Quantity: {project.quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
