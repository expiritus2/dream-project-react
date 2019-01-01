import React from "react";
import { bool } from "prop-types";
import User from "features/user";
import Anonymous from "features/anonymous";

const App = ({ isLoggedIn }) => {
  return isLoggedIn ? <User /> : <Anonymous />;
};

App.propTypes = {
  isLoggedIn: bool.isRequired,
};

export default App;
