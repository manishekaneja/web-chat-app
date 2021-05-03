import { createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
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
  async (emailQuery, { getState, dispatch }) => {
    const { email } = (getState() as RootState).user;

    const currentUserRef = userCollectionRef.doc(email);
    const otherUserRef = userCollectionRef.doc(emailQuery);

    const currentUser = await currentUserRef.get();
    const otherUser = await otherUserRef.get();

    if (!currentUser.exists || !otherUser.exists) {
      throw new Error("User doesn't exists");
    }

    const currentUserData = currentUser.data() as PublicProfile;
    const otherUserData = otherUser.data() as PublicProfile;

    let chatRoomId = nanoid();
    let alreadyHaveARooom = false;

    const existingRoom = await chatroomCollectionRef
      .where("members", "array-contains", [
        currentUserData.email,
        otherUserData.email,
      ])
      .get();

    existingRoom.forEach((doc) => {
      alreadyHaveARooom = doc.exists;
      chatRoomId = doc.data().id;
    });

    const batch = projectFirestore.batch();
    batch.update(currentUserRef, {
      pendingRequest: arrayRemove({
        email: otherUserData.email,
        id: otherUserData.id,
        name: otherUserData.name,
        profile: otherUserData.profilePhoto,
      }),
      friends: arrayUnion({
        email: otherUserData.email,
        id: otherUserData.id,
        name: otherUserData.name,
        profile: otherUserData.profilePhoto,
      }),
    });
    batch.update(otherUserRef, {
      sendRequest: arrayRemove({
        email: currentUserData.email,
        id: currentUserData.id,
        name: currentUserData.name,
        profile: currentUserData.profilePhoto,
      }),
      friends: arrayUnion({
        email: currentUserData.email,
        id: currentUserData.id,
        name: currentUserData.name,
        profile: currentUserData.profilePhoto,
      }),
    });
    const chatroomRef = chatroomCollectionRef.doc(chatRoomId);
    if (!alreadyHaveARooom) {
      batch.set(chatroomRef, {
        id: chatRoomId,
        members: [currentUserData.email, otherUserData.email],
        createdBy: "system",
        creatdedAt: serverTimeStamp(),
        active: true,
      });
    } else {
      batch.update(chatroomRef, {
        active: true,
      });
    }
    await batch.commit();
    return;
  }
);

export { acceptRequestThunk };
