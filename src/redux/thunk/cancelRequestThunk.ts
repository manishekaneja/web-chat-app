import { createAsyncThunk } from "@reduxjs/toolkit";
import { arrayRemove, projectFirestore } from "../..";
const cancelRequestThunk = createAsyncThunk<void, string, { state: RootState }>(
  "thunk/cancelRequest",
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
    const currentUserData = currentUser.data() as PublicProfile;
    const otherUserData = otherUser.data() as PublicProfile;

    const batch = projectFirestore.batch();
    batch.update(currentUserRef, {
      sendRequest: arrayRemove({
        email: otherUserData.email,
        id: otherUserData.id,
        name: otherUserData.name,
        profile: otherUserData.profilePhoto,
      }),
    });
    batch.update(otherUserRef, {
      pendingRequest: arrayRemove({
        email: currentUserData.email,
        id: currentUserData.id,
        name: currentUserData.name,
        profile: currentUserData.profilePhoto,
      }),
    });
    await batch.commit();
    return;
  }
);

export { cancelRequestThunk };
