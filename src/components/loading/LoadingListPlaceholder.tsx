import { FC } from "react";
import { ViewUserProfile } from "../chatListItem/ViewUserProfile";

export const LoadingListPlaceholder: FC<NoProps> = () => {
  return (
    <>
      <ViewUserProfile loading={true} />
      <ViewUserProfile loading={true} />
      <ViewUserProfile loading={true} />
    </>
  );
};
