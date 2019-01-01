import React, { Suspense } from "react";
import { ContentWrapper, Spinner, Header } from "components";
import { Switch, Route } from "react-router-dom";
import userRoutes from "routes/user";

const User = () => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {userRoutes.map(route => {
              return <Route key={route.path} {...route} />;
            })}
          </Switch>
        </Suspense>
      </ContentWrapper>
    </>
  );
};

export default User;
