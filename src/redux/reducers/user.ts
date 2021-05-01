import { createAction, createReducer } from "@reduxjs/toolkit";
const initial$user: UserInfo = {
  id: "",
  email: "",
  name: "",
  profile: "",
  friends: [],
  pendingRequest: [],
  sendRequest: [],
};

const action$setUser = createAction<
  Pick<UserInfo, "id" | "email" | "name" | "profile"> | UserInfo
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
