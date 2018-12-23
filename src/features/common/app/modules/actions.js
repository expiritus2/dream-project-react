import { createRoutine } from "redux-saga-routines";

export const authenticate = createRoutine("APP/AUTH");
export const logout = createRoutine("APP/LOGOUT");
