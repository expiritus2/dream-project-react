import React, { useEffect } from "react";
import { useRedux } from "hooks";
import { authenticate } from "../../modules/actions";
import App from "./App";

const AppContainer = () => {
  const [app, actions] = useRedux("app", { authenticate });

  useEffect(
    () => {
      actions.authenticate();
    },
    [app],
  );

  return <App isLoggedIn={app.isLoggedIn} />;
};

export default AppContainer;
