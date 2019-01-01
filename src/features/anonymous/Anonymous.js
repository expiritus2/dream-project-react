import React, { Suspense } from "react";
import { Header, ContentWrapper, Spinner } from "components";
import { Switch, Route } from "react-router-dom";
import commonRoutes from "routes/common";

const Anonymous = () => {
  return (
    <>
      <Header />
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

export default Anonymous;
