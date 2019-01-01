import { all, fork } from "redux-saga/effects";
import appSagas from "features/app/modules/sagas";
import userSagas from "features/user/modules/sagas";

export default function* rootSaga() {
  yield all([fork(appSagas), fork(userSagas)]);
}
