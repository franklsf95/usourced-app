import { HOME, SIGN_IN } from "/imports/ui/common/routes";
import { App } from "/imports/ui/pages/App";
import { SignIn } from "/imports/ui/pages/SignIn";
import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

Meteor.startup(() => {
  const router = createBrowserRouter([
    {
      path: HOME,
      element: <App />,
    },
    {
      path: SIGN_IN,
      element: <SignIn />,
    },
  ]);
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
