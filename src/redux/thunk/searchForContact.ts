import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectFirestore } from "../..";
const searchForContact = createAsyncThunk<UserInfo[], string>(
  "thunk/searchForContact",
  async (queryString) => {
    const userCollectionRef = projectFirestore.collection(
      "chat-app/main-stream-data/user"
    );
    const userCollectionSnapshot = await userCollectionRef.get();
    const userList: UserInfo[] = [];
    userCollectionSnapshot.forEach((userDoc) => {
      if (userDoc.exists) {
        const user = userDoc.data();
        if (user.name.toLowerCase().includes(queryString.toLowerCase())) {
          userList.push(user as UserInfo);
        }
      }
    });
    return userList;
  }
);


export { searchForContact };
