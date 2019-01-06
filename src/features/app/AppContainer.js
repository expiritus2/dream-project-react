import React, { useEffect, useCallback, useState } from "react";
import TranslationContext from "context/translation";
import { useRedux } from "hooks";
import { getLocale } from "./modules/selectors";
import { authenticate } from "./modules/actions";
import App from "./App";

const AppContainer = () => {
  const [locale, setLocale] = useState(getLocale);
  const [app, actions] = useRedux("app", { authenticate });

  const switchLocale = useCallback(newLocale => {
    setLocale(newLocale);
  }, []);

  useEffect(
    () => {
      actions.authenticate();
    },
    [app],
  );

  return (
    <TranslationContext.Provider value={{ locale, switchLocale }}>
      <App isLoggedIn={app.isLoggedIn} />
    </TranslationContext.Provider>
  );
};

export default AppContainer;
