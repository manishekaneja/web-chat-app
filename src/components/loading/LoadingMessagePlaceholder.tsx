import { FC } from "react";
import { MessageSkeleton } from "./MessageSkeleton";

export const LoadingMessagePlaceholder: FC<NoProps> = () => {
  return (
    <>
      <MessageSkeleton direction="left" />
      <MessageSkeleton direction="right" />
      <MessageSkeleton direction="left" />
    </>
  );
};
