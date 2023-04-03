import React, { useState } from "react";
import { TasksCollection } from "/imports/api/tasks";
import { Meteor } from "meteor/meteor";

export const NewTaskFormView = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      userId: Meteor.userId()!,
      createdAt: new Date(),
      checked: false,
    });

    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};
