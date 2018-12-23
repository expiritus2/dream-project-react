import { all, fork } from "redux-saga/effects";
import { routinePromiseWatcherSaga } from "redux-saga-routines";
import appSagas from "features/common/app/modules/sagas";

export default function* rootSaga() {
  yield all([fork(routinePromiseWatcherSaga), fork(appSagas)]);
}
