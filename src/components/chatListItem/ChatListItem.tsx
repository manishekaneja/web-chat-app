import { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AddUserIcon } from "../../Icons/AddUserIcon";
import { LoaderIcon } from "../../Icons/LoaderIcon";
import { SendRequestIcon } from "../../Icons/SendRequestIcon";
import { dummyThunk } from "../../redux/thunk/dummyThunk";
import { Skeleton } from "../loading/Skeleton";

const ChatListItem: FC<LoadingProps & { data?: UserInfo }> = ({
  loading = true,
  data = null,
}) => {
  const [requestSent, setRequestSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const sendFriendRequest = useCallback(
    (userEmail) => () => {
      setIsLoading(true);
      dispatch(dummyThunk(null))
        .then(() => {
          setRequestSent(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [dispatch]
  );
  return (
    <div className="px-2 py-1 border-b border-gray-300 ">
      {loading || !data ? (
        <Skeleton />
      ) : (
        <div className="flex space-x-4 full-width">
          <div className="flex items-center justify-center">
            <img
              src={data.profile}
              alt={data.name}
              className="h-12 w-12 bg-gray-700 overflow-x-hidden bg-opacity-50 rounded-full shadow-sm"
            />
          </div>
          <div className="flex-1 flex items-center space-y-4 py-1">
            <div className="flex flex-1">{data.name}</div>
            <div className="flex-1"></div>
            {isLoading ? (
              <button
                className="w-20 bg-blue-100 text-blue-800 border border-blue-700 shadow-sm rounded flex items-center justify-center py-1 px-2"
                onClick={() => {
                  setRequestSent(false);
                }}
              >
                <LoaderIcon size={25} />
              </button>
            ) : requestSent ? (
              <button
                className="w-20 bg-blue-100 text-blue-800 border border-blue-700 shadow-sm rounded flex items-center justify-center py-1 px-2"
                onClick={() => {
                  setRequestSent(false);
                }}
              >
                <SendRequestIcon size={25} />
              </button>
            ) : (
              <button
                className="w-20 bg-green-100 text-green-800 border border-green-700 shadow-sm rounded flex items-center justify-center py-1 px-2"
                onClick={sendFriendRequest(data.email)}
              >
                <AddUserIcon size={25} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { ChatListItem };
