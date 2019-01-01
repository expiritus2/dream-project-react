import React from "react";
import User from "features/user";
import Anonymous from "features/anonymous";

const App = ({ isLoggedIn }) => {
  return isLoggedIn ? <User /> : <Anonymous />;
};

export default App;
