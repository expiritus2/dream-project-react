import { createAction } from "redux-actions";

export const authenticate = createAction("APP/AUTH");
export const authenticateSuccess = createAction("APP/AUTH/SUCCESS");
export const authenticateFailure = createAction("APP/AUTH/FAILURE");

export const logout = createAction("APP/LOGOUT");
export const logoutSuccess = createAction("APP/LOGOUT/SUCCESS");
export const logoutFailure = createAction("APP/LOGOUT/FAILURE");
