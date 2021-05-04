import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import { arrayRemove, chatroomCollectionRef, projectFirestore } from "../..";
const removeFriendThunk = createAsyncThunk<void, string, { state: RootState }>(
  "thunk/removeFriend",
  async (uidQuery, { getState, dispatch }) => {
    const { id } = (getState() as RootState).user;
    const userCollectionRef = projectFirestore.collection(
      "chat-app/main-stream-data/user"
    );

    const currentUserRef = userCollectionRef.doc(id);
    const otherUserRef = userCollectionRef.doc(uidQuery);

    const currentUser = await currentUserRef.get();
    const otherUser = await otherUserRef.get();

    if (!currentUser.exists || !otherUser.exists) {
      throw new Error("User doesn't exists");
    }
    const currentUserData = currentUser.data() as User;
    const otherUserData = otherUser.data() as User;

    const existingRoom = await chatroomCollectionRef
      .where("membersCount", "==", 2)
      .where("members", "in", [
        _.sortBy(
          [
            {
              email: currentUserData.email,
              id: currentUserData.id,
              name: currentUserData.name,
              profilePhoto: currentUserData.profilePhoto,
            },
            {
              email: otherUserData.email,
              id: otherUserData.id,
              name: otherUserData.name,
              profilePhoto: otherUserData.profilePhoto,
            },
          ],
          "email"
        ),
      ])
      .get();

    let chatRoomId = "";
    console.log(chatRoomId, existingRoom.size);
    existingRoom.forEach((doc) => {
      console.log(doc);
      chatRoomId = doc.data().id;
    });
    console.log(chatRoomId);
    const batch = projectFirestore.batch();
    batch.update(currentUserRef, {
      friends: arrayRemove({
        email: otherUserData.email,
        id: otherUserData.id,
        name: otherUserData.name,
        profilePhoto: otherUserData.profilePhoto,
        roomId: chatRoomId,
      }),
    });
    batch.update(otherUserRef, {
      friends: arrayRemove({
        email: currentUserData.email,
        id: currentUserData.id,
        name: currentUserData.name,
        profilePhoto: currentUserData.profilePhoto,
        roomId: chatRoomId,
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
