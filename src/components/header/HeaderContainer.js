import React from "react";
import { useRedux } from "hooks";
import Header from "./Header";

const HeaderContainer = () => {
  const [app] = useRedux("app");

  return <Header isLoggedIn={app.isLoggedIn} />;
};

export default HeaderContainer;
