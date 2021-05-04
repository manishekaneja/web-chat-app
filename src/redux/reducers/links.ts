import { createAction, createReducer } from "@reduxjs/toolkit";
const initial$link: Initial$LinkState = {
  records: {},
};

const action$setLink = createAction<
  Record<string, "unknown" | "friend" | "sendRequest" | "recievedRequest">
>("link|set-link");
const reducer$link = createReducer(initial$link, (builder) => {
  builder.addCase(action$setLink, (state, action) => ({
    ...state,
    records:{
      ...action.payload,
    }
  }));
});

export { reducer$link, action$setLink };
