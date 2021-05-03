import { createAction, createReducer } from "@reduxjs/toolkit";
const initial$user: Initial$UserState = {
  id: "",
  email: "",
  name: "",
  profilePhoto: "",
  friends: [],
  pendingRequest: [],
  sendRequest: [],
  status: "unknown",
};

const action$setUser = createAction<
  Pick<User, "id" | "email" | "name" | "profilePhoto"> | User
>("user|set-user");
const action$resetUser = createAction<null>("user|reset-user");

const reducer$user = createReducer(initial$user, (builder) => {
  builder
    .addCase(action$setUser, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase(action$resetUser, () => initial$user);
});

export { reducer$user, action$setUser, action$resetUser };
