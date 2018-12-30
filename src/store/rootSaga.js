import { all, fork } from "redux-saga/effects";
import appSagas from "features/common/modules/sagas";

export default function* rootSaga() {
  yield all([fork(appSagas)]);
}
