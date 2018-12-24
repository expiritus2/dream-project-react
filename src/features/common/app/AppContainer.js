import React from "react";
import { useRedux } from "hooks";
import { authenticate } from "./modules/actions";
import App from "./App";

const AppContainer = () => {
  const [app] = useRedux("app", {
    authenticate: authenticate.trigger,
  });

  return <App isLoggedIn={app.isLoggedIn} />;
};

export default AppContainer;
