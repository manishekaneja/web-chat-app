import { useEffect, useState } from "react";
import { chatroomCollectionRef } from "..";

function useMessagesTracker(roomid: string) {
  const [messages, setMessages] = useState<
    Array<Message & { delivered: boolean }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = chatroomCollectionRef
      .doc(roomid)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
        setIsLoading(false);
        const messagesArray: Array<Message & { delivered: boolean }> = [];
        snapshot.forEach((messageDoc) => {
          const messsageObject: Message & {
            delivered: boolean;
          } = messageDoc.data() as Message & {
            delivered: boolean;
          };
          messsageObject.delivered = messageDoc.metadata.hasPendingWrites;
          // @ts-ignore
          messsageObject.timestamp = messsageObject.timestamp.toDate();
          messagesArray.push(messsageObject);
        });
        setMessages(messagesArray);
      });
    return unsubscribe;
  }, [roomid]);
  return {
    isLoading,
    messages,
  };
}

export default useMessagesTracker;
