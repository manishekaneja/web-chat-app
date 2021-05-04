import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { chatroomCollectionRef } from "..";
import { action$setHistory } from "../redux/reducers/chatHistory";
function useChatHistoryWatcher() {
  const { email, id, name, profilePhoto } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  useEffect(() => {
    const unsubscribe = chatroomCollectionRef
      .where("members", "array-contains", { email, id, name, profilePhoto })
      .where("active", "==", true)
      .where("lastMessage", "!=", null)
      .orderBy("lastMessage")
      .orderBy("updatedAt", "desc")
      .onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
        const roomInfo: Array<ChatHistory> = [];
        snapshot.forEach((room) => {
          const roomObject: ChatHistory = room.data() as ChatHistory;
          if (roomObject.updatedAt) {
            // @ts-ignore
            roomObject.updatedAt = roomObject.updatedAt.toDate();
          }
          if (roomObject.createdBy === "system") {
            const otherUser = _.find(
              roomObject.members,
              (roomMember) => roomMember.email !== email
            );
            if (otherUser) {
              roomObject.alias = otherUser.name;
              roomObject.roomPhoto = otherUser.profilePhoto;
            } else {
              roomObject.alias = "";
              roomObject.roomPhoto = "";
            }
          }
          roomInfo.push(roomObject);
        });
        console.log(roomInfo);
        dispatch(action$setHistory(roomInfo));
      });
    return unsubscribe;
  }, [dispatch, email, id, name, profilePhoto]);
  return;
}

export default useChatHistoryWatcher;
