import { useEffect, useMemo, useReducer, useRef } from "react";
import { useRouter } from "hooks";
import { fetchReducer, fetchState } from "./reducer";
import { getUrlParams } from "./selectors";

export default ({
  request,
  query = {},
  params = [],
  shouldFetch = true, // Used in tabs at most. May be used for other cases.
  shouldListenToSearch = false,
  usePagination = false,
} = {}) => {
  if (!request || typeof request !== "function")
    throw new Error(
      "Param `request` in `useFetch` is required. Also it should be a function.",
    );

  const mounted = useRef(false);
  const [state, dispatch] = useReducer(fetchReducer, fetchState);
  const { location } = useRouter();

  // Build url on first render including query params
  const queryParams = useMemo(
    () =>
      shouldFetch
        ? getUrlParams(query, location, { shouldListenToSearch, usePagination })
        : "",
    [shouldFetch, shouldListenToSearch ? location.search : undefined],
  );

  // Use effect on first render and on search updates if `shouldListenToSearch`.
  // Also it will fire if `shouldFetch` changed.
  useEffect(
    () => {
      if (!shouldFetch) return null;

      dispatch({ type: "loading" });
      mounted.current = true;

      request(...params, queryParams)
        .then(response => {
          if (mounted.current) {
            dispatch({ type: "success", response });
            if (state.firstLoading) dispatch({ type: "firstLoading" });
          }
        })
        .catch(error => {
          if (mounted.current) dispatch({ type: "failure", error });
        });

      return () => {
        mounted.current = false;
      };
    },
    [shouldFetch, shouldListenToSearch ? location.search : undefined],
  );

  return [
    state.loading,
    state.data,
    { ...state.meta, firstLoading: state.firstLoading },
  ];
};
