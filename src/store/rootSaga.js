import { all, fork } from "redux-saga/effects";
import appSagas from "features/common/app/modules/sagas";

export default function* rootSaga() {
  yield all([fork(appSagas)]);
}
