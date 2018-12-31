import { lazy } from "react";

export default [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("features/common/components/main")),
  },
  {
    path: "/sign-in",
    exact: false,
    component: lazy(() => import("features/common/components/sign-in")),
  },
  {
    path: "/sign-up",
    exact: false,
    component: lazy(() => import("features/common/components/sign-up")),
  },

  {
    path: "*",
    exact: false,
    component: lazy(() => import("features/common/components/404")),
  },
];
