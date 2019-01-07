import { takeEvery, put } from "redux-saga/effects";
import {
  userMarkers,
  userMarkersSuccess,
  userMarkersFailure,
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

export function* getUserMarkers() {
  try {
    yield put(userMarkersSuccess(initialMarkers));
  } catch (e) {
    yield put(userMarkersFailure());
  }
}

export function* getAutocompleteNames() {
  try {
    yield put(autocompleteNamesSuccess(autocompleteName));
  } catch (e) {
    yield put(autocompleteNamesFailure());
  }
}

export default function*() {
  yield takeEvery(userMarkers, getUserMarkers);
  yield takeEvery(autocompleteNames, getAutocompleteNames);
}
