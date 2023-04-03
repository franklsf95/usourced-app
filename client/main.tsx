import { ROOT, SIGN_IN, SIGN_UP } from "/imports/ui/common/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { App } from "/imports/ui/pages/App";
import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom/client";
import { SignIn } from "/imports/ui/pages/SignIn";

Meteor.startup(() => {
  const router = createBrowserRouter([
    {
      path: ROOT,
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
