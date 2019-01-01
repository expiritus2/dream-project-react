import { lazy } from "react";

export default [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("features/app/components/main")),
  },
  {
    path: "/sign-in",
    exact: false,
    component: lazy(() => import("features/app/components/sign-in")),
  },
  {
    path: "/sign-up",
    exact: false,
    component: lazy(() => import("features/app/components/sign-up")),
  },

  {
    path: "*",
    exact: false,
    component: lazy(() => import("features/app/components/404")),
  },
];
