import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { ChatHistoryRowItem } from "../components/chatListItem/ChatHistoryRowItem";
import { Header } from "../components/header/Header";
import { LoadingListPlaceholder } from "../components/loading/LoadingListPlaceholder";
import { Routes } from "../constants/Routes";
import { ChatIcon } from "../Icons/ChatIcon";

const HomeScreen: FC<NoProps> = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.application);
  const { loading, history } = useSelector((state: RootState) => state.history);
  return (
    <Fragment>
      {isLoggedIn && <Header title="Chats | Chat-App" />}
      <div className="flex-1 w-full divide-y divide-gray-300 ">
        {loading ? (
          <LoadingListPlaceholder />
        ) : (
          <>
            {history.length > 0 ? (
              history.map((room) => (
                <ChatHistoryRowItem
                  key={room.id}
                  path={`${Routes.room}/${room.id}`}
                  data={room}
                  loading={loading}
                />
              ))
            ) : (
              <div className="text-green-900 opacity-20 h-full flex-col flex items-center justify-center">
                <ChatIcon size={100} />
                <p className="font-semibold">
                  No message yet.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
};

export default HomeScreen;
