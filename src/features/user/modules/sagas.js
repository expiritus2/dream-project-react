import { takeEvery, put } from "redux-saga/effects";
import { userMarkers, userMarkersSuccess, userMarkersFailure } from "./actions";
import { uniqueId } from "lodash-es";

const initialMarkers = [
  {
    id: uniqueId(),
    title: "Test title",
    position: { lat: 53.8427535, lng: 27.646205899999998 },
    draggable: true,
    clickable: true,
  },
];

export function* getUserMarkers() {
  try {
    yield put(userMarkersSuccess(initialMarkers));
  } catch (e) {
    yield put(userMarkersFailure());
  }
}

export default function*() {
  yield takeEvery(userMarkers, getUserMarkers);
}
