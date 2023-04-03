import { Mongo } from "meteor/mongo";

export interface Task {
  _id: string;
  text: String;
  userId: string;
  createdAt: Date;
  checked: boolean;
}

export const TasksCollection = new Mongo.Collection<Task>("tasks");
