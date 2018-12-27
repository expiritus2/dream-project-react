import React from "react";
import { bool } from "prop-types";
import { Header } from "components";

const App = ({ isLoggedIn }) => {
  return <Header isLoggedIn={isLoggedIn} />;
};

export default App;

App.propTypes = {
  isLoggedIn: bool.isRequired,
};
