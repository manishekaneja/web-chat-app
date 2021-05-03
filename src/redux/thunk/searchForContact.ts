import { createAsyncThunk } from "@reduxjs/toolkit";
import { userCollectionRef } from "../..";
const searchForContact = createAsyncThunk<
  Array<PublicProfile>,
  string,
  { state: RootState }
>("thunk/searchForContact", async (queryString, { getState }) => {
  const { id } = getState().user;
  const { records } = getState().link;

  const userCollectionSnapshot = await userCollectionRef.get();
  const userList: Array<PublicProfile> = [];
  userCollectionSnapshot.forEach((userDoc) => {
    if (userDoc.exists) {
      const user = userDoc.data();
      if (
        user.name.toLowerCase().includes(queryString.toLowerCase()) &&
        user.id !== id
      ) {
        userList.push({
          ...(user as PublicProfile),
          status: records[user.email] || "unknown",
        });
      }
    }
  });
  return userList;
});

export { searchForContact };
