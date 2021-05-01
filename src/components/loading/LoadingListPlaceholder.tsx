import { FC } from "react";
import { ChatListItem } from "../chatListItem/ChatListItem";

export const LoadingListPlaceholder: FC<NoProps> = () => {
  return (
    <>
      <ChatListItem loading={true} />
      <ChatListItem loading={true} />
      <ChatListItem loading={true} />
    </>
  );
};
