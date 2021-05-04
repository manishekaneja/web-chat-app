import { nanoid } from "nanoid";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import background from "../assets/chat-background.png";
import { ChatHeader } from "../components/header/ChatHeader";
import { LoadingMessagePlaceholder } from "../components/loading/LoadingMessagePlaceholder";
import { MessageBox } from "../components/message/MessageBox";
import MessageInput from "../components/message/MessageInput";
import useMessagesTracker from "../hooks/useMessagesTracker";
import { useOnlineStatusWatcher } from "../hooks/useOnlineStatusWatcher";
import { sendMessageThunk } from "../redux/thunk/sendMessageThunk";
const ChatRoom: FC<NoProps> = () => {
  const { id } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const { roomid } = useParams<{ roomid: string }>();
  const location = useLocation();
  const [otherPerson, setOtherPerson] = useState<Pick<
    ChatHistory,
    "alias" | "roomPhoto" | "createdBy" | "members"
  > | null>(null);
  useEffect(() => {
    setOtherPerson(
      location.state as Pick<
        ChatHistory,
        "alias" | "roomPhoto" | "createdBy" | "members"
      >
    );
  }, [location.state]);

  const { isLoading, messages } = useMessagesTracker(roomid);
  const isOnline = useOnlineStatusWatcher(
    otherPerson ? otherPerson.members[0].id : ""
  );
  const sendMessage = useCallback(
    (message) => {
      const messageObject: Message = {
        sendBy: id,
        timestamp: new Date(),
        id: nanoid(),
        message: message,
        readBy: [],
      };
      dispatch(
        sendMessageThunk({
          message: messageObject,
          roomId: roomid,
        })
      ).catch((error) => {
        console.log(error.message);
      });
    },
    [dispatch, id, roomid]
  );

  return (
    <div
      className="h-full flex flex-col"
      style={{ background: `url(${background})` }}
    >
      <ChatHeader
        data={otherPerson}
        title={`${otherPerson?.alias} | Messages`}
        isOnline={isOnline}
        showStatus={otherPerson?.createdBy === "system"}
      />
      <div className="flex-1 w-full pt-4  overflow-y-auto flex flex-col-reverse">
        <div className="flex-1" />
        {isLoading ? (
          <LoadingMessagePlaceholder />
        ) : (
          messages.map((singleMessage) => {
            return (
              <MessageBox
                key={singleMessage.id}
                sent={singleMessage.delivered}
                timestamp={singleMessage.timestamp as Date}
                message={singleMessage.message}
                direction={id === singleMessage.sendBy ? "right" : "left"}
              />
            );
          })
        )}
      </div>
      <MessageInput onSubmit={sendMessage} />
    </div>
  );
};

export default ChatRoom;
