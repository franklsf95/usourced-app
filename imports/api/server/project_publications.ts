import Airtable from "airtable";
import { Meteor } from "meteor/meteor";

import { Project, PROJECTS_COLLECTION_NAME } from "../projects";

const POLL_INTERVAL = 1000 * 60 * 1; // 1 minute

Meteor.publish("my_projects", async function publish() {
  if (!this.userId) {
    return [];
  }
  Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
  const airbase = Airtable.base(process.env.AIRTABLE_BASE_ID!);
  const projectsTable = airbase.table("Projects");

  const publishedKeys: { [key: string]: boolean } = {};

  const poll = async () => {
    const records = await projectsTable.select().all();
    records.forEach((record: any) => {
      const key = record.id;
      const project: Project = {
        id: key,
        clientEmail: record.get("Client Email")[0],
        createdTime: new Date(record.get("Created Time")),
        estimatedDeliveryDate: new Date(record.get("Estimated Delivery Date")),
        inquiryDate: new Date(record.get("Inquiry Date")),
        projectImage: record.get("Project Image")[0]["url"],
        projectName: record.get("Project Name"),
        quantity: record.get("Quantity"),
        shipDate: new Date(record.get("Ship Date")),
        shippingMethod: record.get("Shipping Method"),
        shippingStatus: record.get("Shipping Status"),
        status: record.get("Project Status"),
        targetProductionCompletionDate: new Date(
          record.get("Target Production Completion Date")
        ),
        targetSampleCompletionDate: new Date(
          record.get("Target Sample Completion Date")
        ),
        unitPrice: record.get("Unit Price"),
      };
      if (publishedKeys[key]) {
        this.changed(PROJECTS_COLLECTION_NAME, key, project);
      } else {
        publishedKeys[key] = true;
        this.added(PROJECTS_COLLECTION_NAME, key, project);
      }
    });
  };

  poll();
  this.ready();

  const interval = Meteor.setInterval(poll, POLL_INTERVAL);
  this.onStop(() => {
    Meteor.clearInterval(interval);
  });
});
