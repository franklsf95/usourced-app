import { Meteor } from "meteor/meteor";

import { TasksCollection } from "../tasks";

Meteor.publish("tasks", function publishTasks() {
  if (!this.userId) {
    return [];
  }
  return TasksCollection.find({ userId: this.userId });
});
