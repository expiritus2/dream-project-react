import { lazy } from "react";
import commonRoutes from "./common";

export default [
  {
    path: "/personal-area",
    exact: false,
    component: lazy(() => import("features/user/components/personal-area")),
  },

  ...commonRoutes,
];
