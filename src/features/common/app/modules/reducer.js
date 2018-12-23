import { handleActions } from "redux-actions";
import decodeJwt from "jwt-decode";
import { authenticate, logout } from "./actions";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  token: localStorage.getItem("token")
    ? decodeJwt(localStorage.getItem("token"))
    : { user: { type: "" } },
};

const app = handleActions(
  {
    [authenticate.SUCCESS]: (state, action) => ({
      ...state,
      token: action.payload,
      isLoggedIn: true,
      isLoading: false,
    }),
    [authenticate.FAILURE]: state => ({
      ...state,
      token: initialState.token,
      isLoggedIn: false,
      isLoading: false,
    }),
    [logout.SUCCESS]: state => ({
      ...state,
      token: initialState.token,
      isLoggedIn: false,
      isLoading: false,
    }),
  },
  initialState,
);

export default app;
