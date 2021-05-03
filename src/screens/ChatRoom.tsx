import { nanoid } from "nanoid";
import { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import background from "../assets/chat-background.png";
import { ChatHeader } from "../components/header/ChatHeader";
import { LoadingMessagePlaceholder } from "../components/loading/LoadingMessagePlaceholder";
import { MessageBox } from "../components/message/MessageBox";
import MessageInput from "../components/message/MessageInput";
import { dummyThunk } from "../redux/thunk/dummyThunk";
const ChatRoom: FC<NoProps> = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = useCallback(
    (message) => {
      const messageObject: Message = {
        sendBy: user.email,
        timestamp: new Date(),
        id: nanoid(),
        message: message,
        readBy: [],
      };
      setMessages((previousMessages) => {
        const messageList = [...previousMessages];
        messageList.unshift(messageObject);
        return messageList;
      });
      dispatch(dummyThunk(null))
        .then(() => {
          setMessages((previousMessages) => {
            return [...previousMessages].map((singleMessage) => ({
              ...singleMessage,
              send:
                singleMessage.id === messageObject.id
                  ? true
                  : singleMessage.sendBy,
            }));
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    [dispatch, user.email]
  );

  return (
    <div
      className="h-full flex flex-col"
      style={{ background: `url(${background})` }}
    >
      <ChatHeader data={user} />
      <div className="flex-1 w-full divide-y pt-4 divide-gray-300 overflow-y-auto flex flex-col-reverse">
        <div className="flex-1" />
        {isLoading ? (
          <LoadingMessagePlaceholder />
        ) : (
          messages.map((singleMessage) => {
            return (
              <MessageBox
                key={singleMessage.id}
                sent={false}
                timestamp={singleMessage.timestamp as Date}
                message={singleMessage.message}
                direction={
                  user.email === singleMessage.sendBy ? "right" : "left"
                }
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
