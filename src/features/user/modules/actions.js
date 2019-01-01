import { createAction } from "redux-actions";

export const userMarkers = createAction("USER/MARKERS");
export const userMarkersSuccess = createAction("USER/MARKERS/SUCCESS");
export const userMarkersFailure = createAction("USER/MARKERS/FAILURE");
