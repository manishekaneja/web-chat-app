import { createAsyncThunk } from "@reduxjs/toolkit";
import { arrayUnion, projectFirestore } from "../..";
const sendRequestThunk = createAsyncThunk<void, string, { state: RootState }>(
  "thunk/sendRequest",
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

    const currentUserData = currentUser.data() as PublicProfile;
    const otherUserData = otherUser.data() as PublicProfile;

    const batch = projectFirestore.batch();
    batch.update(currentUserRef, {
      sendRequest: arrayUnion({
        email: otherUserData.email,
        id: otherUserData.id,
        name: otherUserData.name,
        profilePhoto: otherUserData.profilePhoto,
      }),
    });
    batch.update(otherUserRef, {
      pendingRequest: arrayUnion({
        email: currentUserData.email,
        id: currentUserData.id,
        name: currentUserData.name,
        profilePhoto: currentUserData.profilePhoto,
      }),
    });
    await batch.commit();
    return;
  }
);

export { sendRequestThunk };
