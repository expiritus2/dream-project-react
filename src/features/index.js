import React from "react";
import { object } from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReduxContext from "context/redux";
import App from "./app";

const Root = ({ store }) => (
  <Provider store={store}>
    <ReduxContext.Provider value={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxContext.Provider>
  </Provider>
);

Root.propTypes = {
  store: object.isRequired,
};

export default Root;
