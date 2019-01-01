import { takeEvery, put, call } from "redux-saga/effects";

import {
  authenticate,
  authenticateSuccess,
  authenticateFailure,
  logout,
  logoutSuccess,
  logoutFailure,
} from "./actions";

export function* authenticateSaga() {
  try {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      yield put(authenticateSuccess(token));
    } else {
      yield put(authenticateFailure());
    }
  } catch (error) {
    yield put(authenticateFailure());
  }
}

export function* logoutSaga({ payload: { history } }) {
  try {
    if (process.env.REACT_APP_ENV === "production") {
      window.location = "https://";
    } else {
      localStorage.removeItem("token");
      yield put(logoutSuccess());
      yield call(history.push, "/");
      yield call(window.scrollTo, 0, 0);
    }
  } catch (error) {
    logoutFailure();
  }
}

export default function*() {
  yield takeEvery(authenticate, authenticateSaga);
  yield takeEvery(logout, logoutSaga);
}
