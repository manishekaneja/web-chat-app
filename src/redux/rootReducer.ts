import { combineReducers } from "redux";
import { reducer$appState } from "./reducers/applicationState";
import { reducer$link } from "./reducers/links";
import { reducer$user } from "./reducers/user";

const rootReducer = combineReducers({
  user: reducer$user,
  application: reducer$appState,
  link: reducer$link,
});

export default rootReducer;
