/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout.js";
import { BaseLayout } from "../layout/BaseLayout.js";
import { DemoLayout } from "../layout/DemoLayout.js";
import { RootError } from "../layout/RootError.js";

const Login = lazy(() => import("./auth/Login.js"));
const Privacy = lazy(() => import("./legal/Privacy.js"));
const Terms = lazy(() => import("./legal/Terms.js"));
const Home = lazy(() => import("./home/HomePage.js"));
const AccountSettings = lazy(() => import("./settings/AccountSettingsPage.js"));
const NewProject = lazy(() => import("./projects/NewProjectPage.js"));
const AIDesignerPage = lazy(() => import("./ai-designer/AIDesignerPage.js"));
const CustomRequestPage = lazy(
  () => import("./custom-request/CustomRequestPage.js"),
);
const ProductListingPage = lazy(
  () => import("./product-listing/ProductListingPage.js"),
);
const DemoProjectsPage = lazy(() => import("./projects/DemoProjectsPage.js"));
const ProjectDetailPage = lazy(() => import("./projects/ProjectDetailPage.js"));

/**
 * Application routes
 * https://reactrouter.com/en/main/routers/create-browser-router
 */
export const router = createBrowserRouter([
  {
    path: "",
    element: <BaseLayout />,
    errorElement: <RootError />,
    children: [
      { path: "login", element: <Login mode="login" /> },
      { path: "signup", element: <Login mode="signup" /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
    ],
  },
  {
    path: "",
    element: <AppLayout />,
    errorElement: <RootError />,
    children: [
      { path: "projects/new", element: <NewProject /> },
      {
        path: "settings",
        children: [
          { index: true, element: <Navigate to="/settings/account" /> },
          { path: "account", element: <AccountSettings /> },
        ],
      },
    ],
  },
  {
    path: "",
    element: <DemoLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Home /> },
      { path: "ai-sourcing-agent", element: <AIDesignerPage /> },
      { path: "custom-request", element: <CustomRequestPage /> },
      { path: "products/:id", element: <ProductListingPage /> },
      { path: "projects-dashboard", element: <DemoProjectsPage /> },
      { path: "projects/:id", element: <ProjectDetailPage /> },
    ],
  },
]);

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
