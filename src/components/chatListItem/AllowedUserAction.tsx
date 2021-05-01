import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AddUserIcon } from "../../Icons/AddUserIcon";
import { CrossIcon } from "../../Icons/CrossIcon";
import { LoaderIcon } from "../../Icons/LoaderIcon";
import { SendRequestIcon } from "../../Icons/SendRequestIcon";
import { TickIcon } from "../../Icons/TickIcon";
import { dummyThunk } from "../../redux/thunk/dummyThunk";

export const AllowedUserAction: FC<{
  data: UserInfo;
  currentState?: "unknown" | "friend" | "sendRequest" | "recievedRequest";
}> = ({ data, currentState = null }) => {
  const [userState, setUserState] = useState<
    "unknown" | "friend" | "sendRequest" | "recievedRequest" | "loading" | null
  >(currentState);
  useEffect(() => {
    setUserState(currentState);
  }, [currentState]);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const sendFriendRequest = useCallback(
    (userEmail) => () => {
      setUserState("loading");
      dispatch(dummyThunk(null))
        .then(() => {
          setUserState("sendRequest");
        })
        .catch(() => {
          setUserState("unknown");
        });
    },
    [dispatch]
  );

  const cancelFriendRequest = useCallback(
    (userEmail) => () => {
      setUserState("loading");
      dispatch(dummyThunk(null))
        .then(() => {
          setUserState("unknown");
        })
        .catch(() => {
          setUserState("sendRequest");
        });
    },
    [dispatch]
  );
  const removeFriend = useCallback(
    (userEmail) => () => {
      setUserState("loading");
      dispatch(dummyThunk(null))
        .then(() => {
          setUserState("unknown");
        })
        .catch(() => {
          setUserState("friend");
        });
    },
    [dispatch]
  );

  const acceptFriendRequest = useCallback(
    (userEmail) => () => {
      setUserState("loading");
      dispatch(dummyThunk(null))
        .then(() => {
          setUserState("friend");
        })
        .catch(() => {
          setUserState("sendRequest");
        });
    },
    [dispatch]
  );
  const rejectFriendRequest = useCallback(
    (userEmail) => () => {
      setUserState("loading");
      dispatch(dummyThunk(null))
        .then(() => {
          setUserState("unknown");
        })
        .catch(() => {
          setUserState("sendRequest");
        });
    },
    [dispatch]
  );

  if (userState === "unknown") {
    return (
      <div className=" flex space-x-2">
        <button
          className="w-20 bg-green-100 text-green-800 border border-green-700 shadow-sm rounded flex items-center justify-center py-1 px-2"
          onClick={sendFriendRequest(data.email)}
        >
          <AddUserIcon size={25} />
        </button>
      </div>
    );
  } else if (userState === "friend") {
    return (
      <div className=" flex space-x-2">
        <button
          className="w-20 bg-red-100 text-red-800 border border-red-700 shadow-sm rounded flex items-center justify-center py-1 px-2"
          onClick={removeFriend(data.email)}
        >
          <CrossIcon size={25} />
        </button>
      </div>
    );
  } else if (userState === "sendRequest") {
    return (
      <div className=" flex space-x-2">
        <button
          className="w-20 bg-blue-100 text-blue-800 border border-blue-700 shadow-sm rounded flex items-center justify-center py-1 px-2"
          onClick={cancelFriendRequest(data.email)}
        >
          <SendRequestIcon size={25} />
        </button>
      </div>
    );
  } else if (userState === "recievedRequest") {
    return (
      <div className=" flex space-x-2">
        <button
          className="w-20 bg-blue-100 text-blue-800 border border-blue-700 shadow-sm rounded flex items-center justify-center py-1 px-2"
          onClick={acceptFriendRequest(data.email)}
        >
          <TickIcon size={25} />
        </button>
        <button
          className="w-20 bg-red-100 text-red-800 border border-red-700 shadow-sm rounded flex items-center justify-center py-1 px-2"
          onClick={rejectFriendRequest(data.email)}
        >
          <CrossIcon size={25} />
        </button>
      </div>
    );
  }
  if (userState === "loading") {
    return (
      <div className=" flex space-x-2">
        <div className=" mx-10 w-20  text-blue-800 border border-transparent shadow-sm rounded flex items-center justify-center py-1 px-2">
          <LoaderIcon size={25} />
        </div>
      </div>
    );
  } else {
    return (
      <div className=" flex space-x-2">
        <div className=" mx-10 w-20 h-8 border border-transparent shadow-sm rounded flex items-center justify-center py-1 px-2"></div>
      </div>
    );
  }
};
