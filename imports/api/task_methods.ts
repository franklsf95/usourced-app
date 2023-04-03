import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

import { TasksCollection } from "./tasks";

Meteor.methods({
  "tasks.insert"(text: string) {
    check(text, String);
    if (!this.userId) {
      throw new Meteor.Error("Only logged in users can insert tasks");
    }

    TasksCollection.insert({
      text,
      userId: this.userId,
      createdAt: new Date(),
      checked: false,
    });
  },
  "tasks.remove"(taskId: string) {
    check(taskId, String);
    if (!this.userId) {
      throw new Meteor.Error("Only logged in users can remove tasks");
    }
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) {
      throw new Meteor.Error("You can only remove your own tasks");
    }
    TasksCollection.remove(taskId);
  },
  "tasks.setChecked"(taskId: string, checked: boolean) {
    check(taskId, String);
    check(checked, Boolean);
    if (!this.userId) {
      throw new Meteor.Error("Only logged in users can mark tasks as checked");
    }
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) {
      throw new Meteor.Error("You can only modify your own tasks");
    }
    TasksCollection.update(taskId, {
      $set: { checked },
    });
  },
});
