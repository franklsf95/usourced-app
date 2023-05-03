/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useParams } from "react-router-dom";
import { RouterLink } from "../../common/RouterLink.js";
import { useFirestoreImage } from "../../core/firebase_utils.js";
import { usePageEffect } from "../../core/page.js";
import { useSnackBar } from "../../layout/components/SnackBarContext.js";
import {
  DemoProject,
  demo_projects_database,
} from "../../models/demo_projects.js";

function ProjectOverview({ project }: { project: DemoProject }): JSX.Element {
  return (
    <Box mt={4} mb={2}>
      <Typography variant="h1" gutterBottom>
        {project.projectName}
      </Typography>
      <Typography variant="h5" gutterBottom>
        <b>Inquiry Date: </b>
        {project.inquiryDate.toLocaleDateString()}
      </Typography>
      <Typography variant="h5" gutterBottom>
        <b>Target Delivery Date: </b>
        {moment().add(14, "days").toDate().toLocaleDateString()}
      </Typography>
    </Box>
  );
}

function ProjectTimelineView(): JSX.Element {
  return (
    <Box>
      <Typography variant="h2">Project Timeline</Typography>
      <img src="/demo/timeline-view.png" width="100%" />
    </Box>
  );
}

function ProjectOriginalRequestView(): JSX.Element {
  const { showDemoAlert } = useSnackBar();
  const properties = [
    { label: "Material", value: "Polyester" },
    { label: "Size", value: "10 in." },
    { label: "Color", value: "White" },
    { label: "Quantity", value: "500" },
    { label: "Target Unit Price", value: "<$10" },
    { label: "Target Sample Delivery", value: "June 1, 2023" },
    { label: "Target Production Completion", value: "June 15, 2023" },
    { label: "Target P.O. Delivery", value: "June 30, 2023" },
  ];
  return (
    <Card>
      <CardContent>
        <Typography variant="h2">Original Request</Typography>
        <Grid container spacing={2} mt={1}>
          {properties.map((property) => (
            <Grid item xs={12} md={6} key={property.label}>
              <Typography variant="h5" fontWeight={600}>
                {property.label}
              </Typography>
              <Typography variant="body1">{property.value}</Typography>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 1 }}
              onClick={showDemoAlert}
            >
              View Design & Attachments
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function ProjectQuoteView(): JSX.Element {
  const { showDemoAlert } = useSnackBar();
  const properties = [
    { label: "Order Quantity", value: "500" },
    { label: "Sampling Fee", value: "$200" },
    { label: "Sampling Days", value: "7" },
    { label: "Production Days", value: "15" },
    { label: "Unit Price (standard shipping)", value: "$6.50" },
    { label: "Unit Price (express shipping)", value: "$10.50" },
  ];
  return (
    <Card>
      <CardContent>
        <Typography variant="h2">Pricing Quotes</Typography>
        <Grid container spacing={2} mt={1}>
          {properties.map((property) => (
            <Grid item xs={12} md={6} key={property.label}>
              <Typography variant="h5" fontWeight={600}>
                {property.label}
              </Typography>
              <Typography variant="body1">{property.value}</Typography>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="text"
              sx={{ mr: 1, textDecoration: "underline" }}
              onClick={showDemoAlert}
            >
              View Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function ProjectSampleOrderView({
  project,
}: {
  project: DemoProject;
}): JSX.Element {
  const { image } = useFirestoreImage({
    path: `/usourced/demo/projects/${project.projectName}.png`,
  });
  const { showDemoAlert } = useSnackBar();
  const properties = [
    { label: "Sample Production Start", value: "April 15, 2023" },
    { label: "Sample Production Completion", value: "April 30, 2023" },
    { label: "Sample Shipped", value: "May 1, 2023" },
    { label: "Estimated Sample Delivery", value: "May 15, 2023" },
    {
      label: "Sample Order Invoice",
      value: (
        <span>
          $200 <Chip label="Paid" color="success" />
        </span>
      ),
    },
  ];
  return (
    <Card>
      <CardContent>
        <Typography variant="h2">Sample Order</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={6}>
                {properties.map((property) => (
                  <Box key={property.label} sx={{ mb: 1 }}>
                    <Typography variant="h5" fontWeight={600}>
                      {property.label}
                    </Typography>
                    <Typography variant="body1">{property.value}</Typography>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight={600}>
                  Sample Picture
                </Typography>
                <img
                  src={image ?? "https://via.placeholder.com/160"}
                  height={200}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 1 }}
              onClick={showDemoAlert}
            >
              View Invoice
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              onClick={showDemoAlert}
            >
              Track Shipment
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="text"
              sx={{ mr: 1, textDecoration: "underline" }}
              onClick={showDemoAlert}
            >
              View Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function ProjectProductionOrderView(): JSX.Element {
  const { showDemoAlert } = useSnackBar();
  const properties = [
    { label: "Production Start", value: "May 15, 2023" },
    { label: "Production Completion", value: "May 30, 2023" },
    { label: "Production Shipped", value: "June 1, 2023" },
    { label: "Estimated Production Delivery", value: "July 1, 2023" },
    {
      label: "Production Order Invoice",
      value: (
        <span>
          $3000 <Chip label="Not Paid" color="warning" />
        </span>
      ),
    },
  ];
  return (
    <Card>
      <CardContent>
        <Typography variant="h2">Production Order</Typography>
        <Grid container spacing={2} mt={1}>
          {properties.map((property) => (
            <Grid item xs={12} md={6} key={property.label}>
              <Typography variant="h5" fontWeight={600}>
                {property.label}
              </Typography>
              <Typography variant="body1">{property.value}</Typography>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 1 }}
              onClick={showDemoAlert}
            >
              View Invoice
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              onClick={showDemoAlert}
            >
              Track Shipment
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="text"
              sx={{ mr: 1, textDecoration: "underline" }}
              onClick={showDemoAlert}
            >
              View Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default function ProjectDetailPage(): JSX.Element {
  const { id = "1" } = useParams<{ id: string }>();
  const project = demo_projects_database[id];
  usePageEffect({ title: project.projectName });

  return (
    <Box component="main" pb={10}>
      <Container maxWidth="lg">
        <Button
          component={RouterLink}
          href="/projects-dashboard"
          variant="contained"
          color="grass"
          sx={{
            ml: 2,
            height: 56,
            color: "#222",
            borderRadius: 10,
            position: "absolute",
            top: 160,
            right: 400,
          }}
        >
          Back to All Projects
        </Button>
        <ProjectOverview project={project} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProjectTimelineView />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectOriginalRequestView />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectQuoteView />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectSampleOrderView project={project} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectProductionOrderView />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
