import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  chatroomCollectionRef,
  projectFirestore,
  serverTimeStamp,
} from "../..";

const sendMessageThunk = createAsyncThunk<
  void,
  { roomId: string; message: Message },
  { state: RootState }
>("thunk/sendMessage", async ({ roomId, message }, { getState, dispatch }) => {
  const { id } = (getState() as RootState).user;
  message.sendBy = id;
  const batch = projectFirestore.batch();
  const messageRef = chatroomCollectionRef
    .doc(roomId)
    .collection("messages")
    .doc(message.id);
  batch.update(chatroomCollectionRef.doc(roomId), {
    updatedAt: serverTimeStamp(),
    lastMessage: message.message,
  });

  batch.set(messageRef, message);
  await batch.commit();
  return;
});

export { sendMessageThunk };
