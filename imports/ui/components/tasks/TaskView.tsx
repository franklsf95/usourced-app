import { Task } from "/imports/api/tasks";
import React from "react";

export const TaskView = ({
  task,
  onCheckboxClick,
  onDeleteClick,
}: {
  task: Task;
  onCheckboxClick: Function;
  onDeleteClick: Function;
}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.checked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};
