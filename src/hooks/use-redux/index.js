import { useState, useEffect, useContext, useMemo } from "react";
import { bindActionCreators } from "redux";
import { isEqual } from "lodash-es";
import ReduxContext from "context/redux";
import { getMappedState } from "./selectors";

export default (mapState = "", mapActions = {}) => {
  const store = useContext(ReduxContext);

  // Set initial state, run only on initial render.
  const [state, setState] = useState(
    useMemo(() => {
      const actualState = store.getState();
      const mappedState = getMappedState(actualState, mapState);
      return mapState === "" ? actualState : mappedState;
    }, []),
  );

  // Bind action creators, run only on initial render.
  const actions = useMemo(
    () =>
      typeof mapActions === "function"
        ? mapActions(store.dispatch)
        : bindActionCreators(mapActions, store.dispatch),
    [],
  );

  // Subscribe on mount and unsubscribe on unmount.
  useEffect(() =>
    store.subscribe(() => {
      const actualState = store.getState();
      const mappedState = getMappedState(actualState, mapState);

      if (typeof mappedState === "undefined") {
        setState(actualState);
        // TODO: Remove isEqual and just mappedState !== state?
      } else if (mappedState !== state && !isEqual(mappedState, state)) {
        setState(mappedState);
      }
    }),
  );

  return [state, actions, store.dispatch];
};
