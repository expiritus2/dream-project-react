import React from "react";
import { useRedux } from "hooks";
import App from "./App";

const AppContainer = () => {
  const [app] = useRedux("app");

  // eslint-disable-next-line
  console.log("state", app);

  return <App />;
};

export default AppContainer;
