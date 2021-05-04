import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  arrayRemove,
  arrayUnion,
  chatroomCollectionRef,
  projectFirestore,
  serverTimeStamp,
  userCollectionRef,
} from "../..";
const acceptRequestThunk = createAsyncThunk<void, string, { state: RootState }>(
  "thunk/acceptRequest",
  async (uidQuery, { getState, dispatch }) => {
    const { id } = (getState() as RootState).user;

    const currentUserRef = userCollectionRef.doc(id);
    const otherUserRef = userCollectionRef.doc(uidQuery);

    const currentUser = await currentUserRef.get();
    const otherUser = await otherUserRef.get();

    if (!currentUser.exists || !otherUser.exists) {
      throw new Error("User doesn't exists");
    }

    const currentUserData = currentUser.data() as PublicProfile;
    const otherUserData = otherUser.data() as PublicProfile;

    let chatRoomId = "";
    const batch = projectFirestore.batch();
    batch.update(currentUserRef, {
      pendingRequest: arrayRemove({
        email: otherUserData.email,
        id: otherUserData.id,
        name: otherUserData.name,
        profilePhoto: otherUserData.profilePhoto,
      }),
      friends: arrayUnion({
        email: otherUserData.email,
        id: otherUserData.id,
        name: otherUserData.name,
        profilePhoto: otherUserData.profilePhoto,
        roomId: chatRoomId,
      }),
    });
    batch.update(otherUserRef, {
      sendRequest: arrayRemove({
        email: currentUserData.email,
        id: currentUserData.id,
        name: currentUserData.name,
        profilePhoto: currentUserData.profilePhoto,
      }),
      friends: arrayUnion({
        email: currentUserData.email,
        id: currentUserData.id,
        name: currentUserData.name,
        profilePhoto: currentUserData.profilePhoto,
        roomId: chatRoomId,
      }),
    });
    const chatroomRef = chatroomCollectionRef.doc(chatRoomId);

    const chatRoomData: ChatRoom = {
      id: chatRoomId,
      members: _.sortBy(
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
      createdBy: "system",
      // @ts-ignore
      creatdedAt: serverTimeStamp(),
      // @ts-ignore
      updatedAt: serverTimeStamp(),
      active: true,
      membersCount: 2,
    };
    batch.set(chatroomRef, chatRoomData);
    await batch.commit();
    return;
  }
);

export { acceptRequestThunk };
