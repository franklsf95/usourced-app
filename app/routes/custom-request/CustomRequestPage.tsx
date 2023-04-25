/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Typography } from "@mui/material";
import { Widget } from "@typeform/embed-react";
import { usePageEffect } from "../../core/page.js";

export default function CustomRequestPage(): JSX.Element {
  usePageEffect({ title: "White-Glove VIP Service" });

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h1" mb={2}>
        White-Glove VIP Service
      </Typography>
      <Typography variant="body1" mb={1}>
        Our agency provides white-glove service for you to launch custom
        products - we do everything from design, sampling, production, packaging
        and quality control, to global fulfillment.
      </Typography>
      <Typography variant="body1">
        White-glove VIP service MOQ starts at 1,000 units.
      </Typography>
      <Typography variant="h2" mt={4} mb={2}>
        New Client? Fill out this form first:
      </Typography>
      <Widget id="djEwoPSB" style={{ height: 600 }} />
      <Typography variant="h2" mt={4} mb={2}>
        Submit a Custom Product Sourcing Request
      </Typography>
      <Typography variant="body1" mb={2}>
        Limit one form to one custom product submission. If you are looking to
        source multiple products, please fill out this form multiple times.
      </Typography>
      <Widget id="GU8mFH90" style={{ height: 600 }} />
    </Container>
  );
}
