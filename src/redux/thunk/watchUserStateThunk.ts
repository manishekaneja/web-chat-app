import { createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { projectAuth, projectFirestore } from "../..";
import { action$login } from "../reducers/applicationState";
import { action$resetUser, action$setUser } from "../reducers/user";
const watchUserStateThunk = createAsyncThunk<void>(
  "thunk/watchUserState",
  async (_, { dispatch }) => {
    projectAuth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        const userRef = projectFirestore
          .collection("chat-app/main-stream-data/user")
          .doc(user.email);
        const userObject = await userRef.get();
        console.log(userObject.exists);
        if (!userObject.exists) {
          const userData: UserInfo = {
            id: nanoid(),
            email: user.email,
            friends: [],
            pendingRequest: [],
            sendRequest: [],
            name: user.displayName || "",
            profile: user.photoURL || "",
          };
          await userRef.set(userData);
          dispatch(action$setUser(userData));
        } else {
          const userData: UserInfo = {
            id: "",
            email: user.email,
            friends: [],
            pendingRequest: [],
            sendRequest: [],
            name: user.displayName || "",
            profile: user.photoURL || "",
            ...userObject.data(),
          };
          dispatch(action$setUser(userData));
        }
        dispatch(action$login(null));
      } else {
        dispatch(action$resetUser(null));
      }
    });
    return;
  }
);

export { watchUserStateThunk };
