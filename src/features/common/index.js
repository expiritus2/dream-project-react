import React from "react";
import { object } from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import TranslationContext from "context/translation";
import ReduxContext from "context/redux";
import App from "./components/app";

const Root = ({ store }) => (
  <Provider store={store}>
    <ReduxContext.Provider value={store}>
      <TranslationContext.Provider value="en">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TranslationContext.Provider>
    </ReduxContext.Provider>
  </Provider>
);

Root.propTypes = {
  store: object.isRequired,
};

export default Root;
