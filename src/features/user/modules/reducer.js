import { handleActions } from "redux-actions";
import {
  userMarkersSuccess,
  userMarkersFailure,
  autocompleteNamesSuccess,
  autocompleteNamesFailure,
} from "./actions";

const initialState = {
  markers: [],
  errors: null,
  autocompleteNames: null,
};

const user = handleActions(
  {
    [userMarkersSuccess]: (state, action) => ({
      ...state,
      markers: action.payload,
      errors: null,
    }),
    [userMarkersFailure]: state => ({
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
  },
  initialState,
);

export default user;
