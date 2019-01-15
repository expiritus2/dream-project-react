import { handleActions } from "redux-actions";
import {
  getUserMarkersSuccess,
  getUserMarkersFailure,
  autocompleteNamesSuccess,
  autocompleteNamesFailure,
  setMarkersAction,
  setMarkerToList,
} from "./actions";

const initialState = {
  markers: [],
  errors: null,
  autocompleteNames: null,
};

const user = handleActions(
  {
    [getUserMarkersSuccess]: (state, action) => ({
      ...state,
      markers: action.payload,
      errors: null,
    }),
    [getUserMarkersFailure]: state => ({
      ...state,
      errors: {
        markersMessage: "An error occured during loading the markers",
      },
    }),
    [autocompleteNamesSuccess]: (state, action) => ({
      ...state,
      autocompleteNames: action.payload,
    }),
    [autocompleteNamesFailure]: state => ({
      ...state,
      errors: {
        ...state.errors,
        autocompleteMessage:
          "An error occured during loading the autocomplete names",
      },
    }),
    [setMarkerToList]: (state, action) => ({
      ...state,
      markers: [...state.markers, action.payload],
    }),
    [setMarkersAction]: (state, action) => ({
      ...state,
      markers: action.payload,
    }),
  },
  initialState,
);

export default user;
