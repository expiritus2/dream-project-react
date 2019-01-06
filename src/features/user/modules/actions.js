import { createAction } from "redux-actions";

export const userMarkers = createAction("USER/MARKERS/TRIGGER");
export const userMarkersSuccess = createAction("USER/MARKERS/SUCCESS");
export const userMarkersFailure = createAction("USER/MARKERS/FAILURE");

export const autocompleteNames = createAction("USER/AUTOCOMPLETE/TRIGGER");
export const autocompleteNamesSuccess = createAction(
  "USER/AUTOCOMPLETE/SUCCESS",
);
export const autocompleteNamesFailure = createAction(
  "USER/AUTOCOMPLETE/FAILURE",
);
