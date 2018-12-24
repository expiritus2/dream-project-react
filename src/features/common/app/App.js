import React from "react";
import { bool } from "prop-types";

const App = ({ isLoggedIn }) => (
  <div className="page-wrapper">{isLoggedIn ? "Hello" : "Goodby"}</div>
);

export default App;

App.propTypes = {
  isLoggedIn: bool.isRequired,
};
