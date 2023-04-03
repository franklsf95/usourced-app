import * as React from "react";

import { Task, TasksCollection } from "/imports/api/tasks";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalFooter } from "../components/GlobalFooter";
import { GlobalNavBar } from "../components/GlobalNavBar";
import { NewTaskFormView } from "../components/tasks/NewTaskFormView";
import Stack from "@mui/material/Stack";
import { TaskView } from "../components/tasks/TaskView";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { appTheme } from "../common/theme";
import { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const currentUser = useTracker(() => Meteor.user());
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const currentUserFilter = currentUser ? { userId: currentUser._id } : {};
  const currentUserHideCompletedFilter = {
    ...currentUserFilter,
    ...hideCompletedFilter,
  };
  const tasks = useTracker(() =>
    TasksCollection.find(
      hideCompleted ? currentUserHideCompletedFilter : currentUserFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch()
  );
  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(currentUserHideCompletedFilter).count()
  );
  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;
  const toggleChecked = ({
    _id,
    checked,
  }: {
    _id: string;
    checked: boolean;
  }) => {
    TasksCollection.update(_id, {
      $set: {
        checked: !checked,
      },
    });
  };
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <GlobalNavBar />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom>
              USourced
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph>
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <div>
              <h1>
                📝️ To Do List
                {pendingTasksTitle}
              </h1>
              <NewTaskFormView />
              <div className="filter">
                <button onClick={() => setHideCompleted(!hideCompleted)}>
                  {hideCompleted ? "Show All" : "Hide Completed"}
                </button>
              </div>
              <ul>
                {tasks.map((task: Task) => (
                  <TaskView
                    key={task._id}
                    task={task}
                    onCheckboxClick={toggleChecked}
                    onDeleteClick={() => TasksCollection.remove(task._id)}
                  />
                ))}
              </ul>
            </div>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center">
              <Button variant="contained">Try it now!</Button>
            </Stack>
          </Container>
        </Box>
      </main>
      <GlobalFooter />
    </ThemeProvider>
  );
};
