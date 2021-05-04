import { createAction, createReducer } from "@reduxjs/toolkit";
const initial$chatHistory: Initial$ChatHistory = {
  history: [],
  loading: true,
};

const action$setHistory = createAction<ChatHistory[]>(
  "chat-history|set-hitory"
);
const reducer$chatHistory = createReducer(initial$chatHistory, (builder) => {
  builder.addCase(action$setHistory, (state, action) => ({
    ...state,
    history: action.payload,
    loading: false,
  }));
});

export { reducer$chatHistory, action$setHistory };
