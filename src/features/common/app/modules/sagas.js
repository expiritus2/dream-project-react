import { takeEvery, put, call } from "redux-saga/effects";
import decodeJwt from "jwt-decode";

import { authenticate, logout } from "./actions";

export function* authenticateSaga() {
  try {
    if (localStorage.getItem("token")) {
      const token = decodeJwt(localStorage.getItem("token"));

      yield put(authenticate.success(token));
    } else {
      yield put(authenticate.failure());
    }
  } catch (error) {
    yield put(authenticate.failure());
  }
}

export function* logoutSaga({ payload: { history } }) {
  try {
    if (process.env.REACT_APP_ENV === "production") {
      window.location = "https://";
    } else {
      localStorage.removeItem("token");
      yield put(logout.success());
      yield call(history.push, "/");
      yield call(window.scrollTo, 0, 0);
    }
  } catch (error) {
    logout.failure();
  }
}

export default function*() {
  yield takeEvery(authenticate.TRIGGER, authenticateSaga);
  yield takeEvery(logout.TRIGGER, logoutSaga);
}
