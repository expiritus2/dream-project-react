import { combineReducers } from "redux";
import app from "features/app/modules/reducer";
import user from "features/user/modules/reducer";

const reducers = combineReducers({
  app,
  user,
});

// Clear all redux state when user logout from application
const rootReducer = (state, action) => {
  if (action.type === "APP/LOGOUT/SUCCESS") {
    state = undefined; // eslint-disable-line
  }

  return reducers(state, action);
};

export default rootReducer;
