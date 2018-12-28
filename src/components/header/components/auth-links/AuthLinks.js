import React from "react";
import { Link } from "components";

const AuthLinks = () => {
  return (
    <div className="main-navigation auth-block">
      <Link to="/sign-in">SignIn</Link>
      <Link to="/sign-up">SignUp</Link>
    </div>
  );
};

export default AuthLinks;
