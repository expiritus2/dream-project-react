import { handleActions } from "redux-actions";
import { userMarkersSuccess, userMarkersFailure } from "./actions";

const initialState = {
  markers: [],
  errors: null,
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
  },
  initialState,
);

export default user;
