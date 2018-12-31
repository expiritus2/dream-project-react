import React, { useEffect, useMemo } from "react";
import { useRedux } from "hooks";
import { authenticate } from "../../modules/actions";
import { commonRoutes, userRoutes } from "routes";
import App from "./App";

const AppContainer = () => {
  const [app, actions] = useRedux("app", { authenticate });

  useEffect(
    () => {
      actions.authenticate();
    },
    [app],
  );

  const routes = useMemo(() => {
    return app.isLoggedIn ? userRoutes : commonRoutes;
  });

  return <App routes={routes} />;
};

export default AppContainer;
