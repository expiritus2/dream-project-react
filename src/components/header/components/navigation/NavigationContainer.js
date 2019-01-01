import React, { lazy, Suspense } from "react";
import { bool } from "prop-types";
import { Spinner } from "components";

const Navigation = lazy(() => import("./Navigation"));
const AuthLinks = lazy(() => import("../auth-links"));

const NavigationContainer = ({ isLoggedIn }) => {
  return (
    <Suspense fallback={<Spinner />}>
      {isLoggedIn ? <Navigation /> : <AuthLinks />}
    </Suspense>
  );
};

NavigationContainer.propTypes = {
  isLoggedIn: bool,
};

NavigationContainer.defaultProps = {
  isLoggedIn: false,
};

export default NavigationContainer;
