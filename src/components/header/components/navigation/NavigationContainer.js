import React from "react";
import Navigation from "./Navigation";
import AuthLinks from "../auth-links";

const NavigationContainer = ({ isLoggedIn }) => {
  return isLoggedIn ? <Navigation /> : <AuthLinks />;
};

export default NavigationContainer;
