import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { bool } from "prop-types";
import { Header } from "components";
import { ContentWrapper, Spinner } from "components";
import commonRoutes from "../../../../routes/common";

const App = ({ isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <ContentWrapper>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {commonRoutes.map(route => {
              return <Route key={route.path} {...route} />;
            })}
          </Switch>
        </Suspense>
      </ContentWrapper>
    </>
  );
};

export default App;

App.propTypes = {
  isLoggedIn: bool.isRequired,
};
