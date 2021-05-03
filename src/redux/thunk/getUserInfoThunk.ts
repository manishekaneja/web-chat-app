import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectFirestore } from "../..";
import { action$setUser } from "../reducers/user";
const getUserInfoThunk = createAsyncThunk<void, void, { state: RootState }>(
  "thunk/getUserInfo",
  async (_, { getState, dispatch }) => {
    const { email } = (getState() as RootState).user;
    const userRef = projectFirestore
      .collection("chat-app/main-stream-data/user")
      .doc(email);
    const userObject = await userRef.get();
    if (!userObject.exists) {
      throw new Error("User Not Found");
    } else {
      const userData: User = {
        id: "",
        email: email,
        status: "unknown",
        friends: [],
        pendingRequest: [],
        sendRequest: [],
        name: "",
        profilePhoto: "",
        ...userObject.data(),
      };
      dispatch(action$setUser(userData));
    }
    return;
  }
);

export { getUserInfoThunk };
