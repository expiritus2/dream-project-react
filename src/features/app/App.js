import React from "react";
import { bool } from "prop-types";
import User from "features/user";
import Anonymous from "features/anonymous";
import { Modal } from "components";

const App = ({ isLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? <User /> : <Anonymous />}
      <Modal />
    </>
  );
};

App.propTypes = {
  isLoggedIn: bool.isRequired,
};

export default App;
