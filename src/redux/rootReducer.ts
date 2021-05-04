import { combineReducers } from "redux";
import { reducer$appState } from "./reducers/applicationState";
import { reducer$chatHistory } from "./reducers/chatHistory";
import { reducer$link } from "./reducers/links";
import { reducer$user } from "./reducers/user";

const rootReducer = combineReducers({
  user: reducer$user,
  application: reducer$appState,
  link: reducer$link,
  history: reducer$chatHistory,
});

export default rootReducer;
