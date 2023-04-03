import "/imports/api/tasks";

import { TasksCollection } from "/imports/db/tasks";
import Airtable from "airtable";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

const SEED_USERNAME = "user";
const SEED_PASSWORD = "user";

// Meteor.startup(() => {
//   Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
//   const airbase = Airtable.base(process.env.AIRTABLE_BASE_ID!);
//   const tasksTable = airbase("Tasks");
//   console.log("table", tasksTable);
//   const record = await tasksTable.find("recehHIrPcAX2qqbi");
//   console.log("find", record);
//   const data = await tasksTable.select().all();
//   console.log("fetched airtable data", data);
//   Meteor.publish("tasks", async () => {
//     const publishedKeys = {};
//     const poll = async () => {
//       const data = await tasksTable.select().all();
//       console.log("fetched airtable data", data);
//     };
//     await poll();
//     this.ready();
//     const interval = Meteor.setInterval(poll, POLL_INTERVAL);
//     this.onStop(() => {
//       Meteor.clearInterval(interval);
//     });
//   });
// });

const insertTask = (taskText: string, user: Meteor.User) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
    checked: false,
  });

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  // const firstUser = Accounts.findUserByUsername(SEED_USERNAME)!;
  // [
  //   "First Task",
  //   "Second Task",
  //   "Third Task",
  //   "Fourth Task",
  //   "Fifth Task",
  //   "Sixth Task",
  //   "Seventh Task",
  // ].forEach((text) => insertTask(text, firstUser));
});
