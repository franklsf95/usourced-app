import { HOME, MY_PROJECTS, SIGN_IN } from "/imports/ui/common/routes";
import { Home } from "/imports/ui/pages/Home";
import { MyProjects } from "/imports/ui/pages/MyProjects";
import { SignIn } from "/imports/ui/pages/SignIn";
import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

Meteor.startup(() => {
  const router = createBrowserRouter([
    {
      path: HOME,
      element: <Home />,
    },
    {
      path: SIGN_IN,
      element: <SignIn />,
    },
    {
      path: MY_PROJECTS,
      element: <MyProjects />,
    },
  ]);
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
