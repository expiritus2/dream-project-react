import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "components";
import { ContentWrapper, Spinner } from "components";

const App = ({ routes }) => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {routes.map(route => {
              return <Route key={route.path} {...route} />;
            })}
          </Switch>
        </Suspense>
      </ContentWrapper>
    </>
  );
};

export default App;
