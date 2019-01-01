import { handleActions } from "redux-actions";
import {
  authenticateSuccess,
  authenticateFailure,
  logoutSuccess,
} from "./actions";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
};

const app = handleActions(
  {
    [authenticateSuccess]: (state, action) => ({
      ...state,
      token: action.payload,
      isLoggedIn: true,
      isLoading: false,
    }),
    [authenticateFailure]: state => ({
      ...state,
      token: initialState.token,
      isLoggedIn: false,
      isLoading: false,
    }),
    [logoutSuccess]: state => ({
      ...state,
      token: initialState.token,
      isLoggedIn: false,
      isLoading: false,
    }),
  },
  initialState,
);

export default app;
