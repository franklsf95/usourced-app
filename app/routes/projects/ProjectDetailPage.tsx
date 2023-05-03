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
import { RouterLink } from "../../common/RouterLink.js";
import { useFirestoreImage } from "../../core/firebase_utils.js";
import { usePageEffect } from "../../core/page.js";
import { useSnackBar } from "../../layout/components/SnackBarContext.js";

function ProjectOverview(): JSX.Element {
  return (
    <Box mt={4} mb={2}>
      <Typography variant="h1" gutterBottom>
        Fluffy White Cat Plushie
      </Typography>
      <Typography variant="h5" gutterBottom>
        <b>Inquiry Date: </b>November 22, 2022
      </Typography>
      <Typography variant="h5" gutterBottom>
        <b>Target Delivery Date: </b>June 1, 2023
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
    { label: "Mold Fee", value: "$0" },
    { label: "Production Days", value: "15" },
    { label: "Testing Fee", value: "$0" },
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
              variant="contained"
              color="secondary"
              sx={{ mr: 1 }}
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

function ProjectSampleOrderView(): JSX.Element {
  const { image } = useFirestoreImage({
    path: "/usourced/demo/projects/Fluffy White Cat Plushie.png",
  });
  const { showDemoAlert } = useSnackBar();
  const properties = [
    { label: "Sample Production Start", value: "April 15, 2023" },
    { label: "Sample Production Completion", value: "April 30, 2023" },
    { label: "Sample Shipped", value: "May 1, 2023" },
    { label: "Estimated Sample Delivery", value: "May 15, 2023" },
  ];
  return (
    <Card>
      <CardContent>
        <Typography variant="h2">Sample Order</Typography>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Sample Picture
          </Typography>
          <img src={image ?? "https://via.placeholder.com/160"} height={160} />
        </Box>
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
              color="primary"
              sx={{ mr: 1 }}
              onClick={showDemoAlert}
            >
              Track Shipment
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
              color="primary"
              sx={{ mr: 1, mb: 1 }}
              onClick={showDemoAlert}
            >
              Track Express Shipment #1
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 1, mb: 1 }}
              onClick={showDemoAlert}
            >
              Track Regular Shipment #2
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              onClick={showDemoAlert}
            >
              View Invoice
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default function ProjectDetailPage(): JSX.Element {
  usePageEffect({ title: "My Projects" });

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
        <ProjectOverview />
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
            <ProjectSampleOrderView />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectProductionOrderView />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
