import { createAction } from "redux-actions";

export const getUserMarkers = createAction("USER/MARKERS");
export const getUserMarkersSuccess = createAction("USER/MARKERS/SUCCESS");
export const getUserMarkersFailure = createAction("USER/MARKERS/FAILURE");

export const setMarkersAction = createAction("USER/MARKERS/SET");
export const setMarkerToList = createAction("USER/MARKER/SET");

export const autocompleteNames = createAction("USER/AUTOCOMPLETE");
export const autocompleteNamesSuccess = createAction(
  "USER/AUTOCOMPLETE/SUCCESS",
);
export const autocompleteNamesFailure = createAction(
  "USER/AUTOCOMPLETE/FAILURE",
);
