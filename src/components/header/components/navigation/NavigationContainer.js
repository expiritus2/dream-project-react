import React, { lazy, Suspense } from "react";
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

export default NavigationContainer;
