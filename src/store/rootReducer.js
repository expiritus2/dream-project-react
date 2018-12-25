import { combineReducers } from "redux";
import app from "features/common/app/modules/reducer";

const reducers = combineReducers({
  app,
});

// Clear all redux state when user logout from application
const rootReducer = (state, action) => {
  if (action.type === "APP/LOGOUT/SUCCESS") {
    state = undefined; // eslint-disable-line
  }

  return reducers(state, action);
};

export default rootReducer;
