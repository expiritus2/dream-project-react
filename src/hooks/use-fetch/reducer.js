import { denormalizeJsonApi } from "./utils";

export const fetchState = {
  firstLoading: true,
  loading: true,
  error: false,
  data: undefined,
  meta: undefined,
};

export const fetchReducer = (state, action) => {
  switch (action.type) {
    case "firstLoading":
      return {
        ...state,
        firstLoading: false,
      };
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "success":
      return {
        ...state,
        data: action.response.headers["content-type"].includes("api+json")
          ? denormalizeJsonApi(action.response.data)
          : action.response.data,
        meta: action.response.data.meta,
        loading: false,
        error: false,
      };
    case "failure":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
