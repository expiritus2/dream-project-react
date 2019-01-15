import { takeEvery, put } from "redux-saga/effects";
import {
  getUserMarkers,
  getUserMarkersSuccess,
  getUserMarkersFailure,
  autocompleteNames,
  autocompleteNamesSuccess,
  autocompleteNamesFailure,
} from "./actions";
import { uniqueId } from "lodash-es";

const initialMarkers = [
  {
    id: uniqueId(),
    title: "Test title",
    position: { lat: 53.8427535, lng: 27.646205899999998 },
    userDate: new Date().getTime(),
    radius: 1000, // meters
    draggable: true,
    clickable: true,
  },
];

const autocompleteName = [
  { label: "apple" },
  { label: "banana" },
  { label: "pear" },
  { label: "apple" },
  { label: "banana" },
  { label: "pear" },
  { label: "apple" },
  { label: "banana" },
  { label: "pear" },
  { label: "apple" },
  { label: "banana" },
  { label: "pear" },
];

export function* getUserMarkersSaga() {
  try {
    yield put(getUserMarkersSuccess(initialMarkers));
  } catch (e) {
    yield put(getUserMarkersFailure());
  }
}

export function* getAutocompleteNamesSaga() {
  try {
    yield put(autocompleteNamesSuccess(autocompleteName));
  } catch (e) {
    yield put(autocompleteNamesFailure());
  }
}

export default function*() {
  yield takeEvery(getUserMarkers, getUserMarkersSaga);
  yield takeEvery(autocompleteNames, getAutocompleteNamesSaga);
}
