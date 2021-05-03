import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectFirestore } from "../..";
const searchForContact = createAsyncThunk<
  Array<PublicProfile>,
  string,
  { state: RootState }
>("thunk/searchForContact", async (queryString, { getState }) => {
  const userCollectionRef = projectFirestore.collection(
    "chat-app/main-stream-data/user"
  );
  const { email, friends, pendingRequest, sendRequest } = getState().user;

  const searchMap: Record<
    string,
    "unknown" | "friend" | "sendRequest" | "recievedRequest"
  > = {};

  friends.forEach((singlePerson) => {
    searchMap[singlePerson.email] = "friend";
  });
  pendingRequest.forEach((singlePerson) => {
    searchMap[singlePerson.email] = "recievedRequest";
  });
  sendRequest.forEach((singlePerson) => {
    searchMap[singlePerson.email] = "sendRequest";
  });

  const userCollectionSnapshot = await userCollectionRef.get();
  const userList: Array<PublicProfile> = [];
  userCollectionSnapshot.forEach((userDoc) => {
    if (userDoc.exists) {
      const user = userDoc.data();
      if (
        user.name.toLowerCase().includes(queryString.toLowerCase()) &&
        user.email !== email
      ) {
        userList.push({
          ...(user as PublicProfile),
          status: searchMap[user.email] || "unknown",
        });
      }
    }
  });
  return userList;
});

export { searchForContact };
