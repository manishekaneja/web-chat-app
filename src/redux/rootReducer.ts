import { combineReducers } from "redux";
import { reducer$appState } from "./reducers/applicationState";
import { reducer$user } from "./reducers/user";

const rootReducer = combineReducers({
  user: reducer$user,
  application: reducer$appState,
});

export default rootReducer;
