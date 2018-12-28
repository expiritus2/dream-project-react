import { lazy } from "react";

export default [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("components/main")),
  },
  {
    path: "/sign-in",
    exact: false,
    component: lazy(() => import("features/common/sign-in")),
  },
  {
    path: "/sign-up",
    exact: false,
    component: lazy(() => import("features/common/sign-up")),
  },
];