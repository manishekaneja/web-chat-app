import { createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { arrayRemove, chatroomCollectionRef, projectFirestore } from "../..";
const removeFriendThunk = createAsyncThunk<void, string, { state: RootState }>(
  "thunk/removeFriend",
  async (emailQuery, { getState, dispatch }) => {
    const { email } = (getState() as RootState).user;
    const userCollectionRef = projectFirestore.collection(
      "chat-app/main-stream-data/user"
    );

    const currentUserRef = userCollectionRef.doc(email);
    const otherUserRef = userCollectionRef.doc(emailQuery);

    const currentUser = await currentUserRef.get();
    const otherUser = await otherUserRef.get();

    if (!currentUser.exists || !otherUser.exists) {
      throw new Error("User doesn't exists");
    }

    const currentUserData = currentUser.data() as User;
    const otherUserData = otherUser.data() as User;

    const existingRoom = await chatroomCollectionRef
      .where("members", "array-contains", [
        currentUserData.email,
        otherUserData.email,
      ])
      .get();

    let chatRoomId = nanoid();
    existingRoom.forEach((doc) => {
      chatRoomId = doc.data().id;
    });

    const batch = projectFirestore.batch();
    batch.update(currentUserRef, {
      friends: arrayRemove({
        email: otherUserData.email,
        id: otherUserData.id,
        name: otherUserData.name,
        profile: otherUserData.profilePhoto,
      }),
    });
    batch.update(otherUserRef, {
      friends: arrayRemove({
        email: currentUserData.email,
        id: currentUserData.id,
        name: currentUserData.name,
        profile: currentUserData.profilePhoto,
      }),
    });

    const chatroomRef = chatroomCollectionRef.doc(chatRoomId);
    batch.update(chatroomRef, {
      active: false,
    });
    await batch.commit();
    return;
  }
);

export { removeFriendThunk };
