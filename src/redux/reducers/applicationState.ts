import { createAction, createReducer } from "@reduxjs/toolkit";
const inital$appState: Reducer$ApplicationState = {
  isLoggedIn: false,
};

const action$login = createAction<null>("appState|login");
const action$logout = createAction<null>("appState|logout");

const reducer$appState = createReducer(inital$appState, (builder) => {
  builder
    .addCase(action$login, (state) => ({
      ...state,
      isLoggedIn: true,
    }))
    .addCase(action$logout, (state) => ({
      ...state,
      isLoggedIn: false,
    }));
});

export { reducer$appState, action$logout, action$login };
