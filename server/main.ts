import { Meteor } from "meteor/meteor";
import { Task, TasksCollection } from "/imports/api/tasks";
import Airtable from "airtable";

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

const insertTask = (taskText: string) =>
  TasksCollection.insert({
    text: taskText,
    createdAt: new Date(),
    checked: false,
  });

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(insertTask);
  }
});
