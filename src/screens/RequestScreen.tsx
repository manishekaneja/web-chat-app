import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ViewUserProfile } from "../components/chatListItem/ViewUserProfile";
import { Header } from "../components/header/Header";
import SearchSection from "../components/search/SearchSection";
import { AddUserIcon } from "../Icons/AddUserIcon";
import { getUserInfoThunk } from "../redux/thunk/getUserInfoThunk";

const RequestDefaultLayout = () => (
  <div className="flex items-center justify-end flex-col h-96">
    <h3 className="text-green-900 opacity-70 mb-10">
      <AddUserIcon size={100} />
    </h3>
    <p className="text-center text-green-900 opacity-70 font-bold">
      Looks like you dont have any request
    </p>
  </div>
);

const RequestScreen: FC<NoProps> = () => {
  const { pendingRequest, sendRequest } = useSelector(
    (state: RootState) => state.user
  );
  const { isLoggedIn } = useSelector((state: RootState) => state.application);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, [dispatch]);

  const renderRequestView = useCallback(
    (pending: PublicProfile[], send: PublicProfile[]) => (
      showDefault: boolean
    ) => {
      if (pending.length <= 0 && send.length <= 0 && showDefault) {
        return <RequestDefaultLayout />;
      }
      return (
        <>
          {pending.length > 0 && (
            <div className="relative">
              <div className="sticky top-14 bg-white shadow">
                <h2 className=" text-green-700 text-base px-2 py-2 bg-green-700 bg-opacity-10 border-b border-green-700 font-bold">
                  Pending Request
                </h2>
              </div>
              {pending.map((singlePerson) => (
                <ViewUserProfile
                  key={singlePerson.id}
                  loading={false}
                  currentState="recievedRequest"
                  data={singlePerson}
                />
              ))}
            </div>
          )}
          {send.length > 0 && (
            <div className="">
              <div className="sticky top-14 bg-white shadow">
                <h2 className=" text-green-700 text-base px-2 py-2 bg-green-700 bg-opacity-10 border-b border-green-700 font-bold">
                  Send Request
                </h2>
              </div>
              {send.map((singlePerson) => (
                <ViewUserProfile
                  key={singlePerson.id}
                  loading={false}
                  currentState="sendRequest"
                  data={singlePerson}
                />
              ))}
            </div>
          )}
        </>
      );
    },
    []
  );
  return (
    <>
      {isLoggedIn && <Header />}

      <SearchSection
        rendererFunc={renderRequestView(pendingRequest, sendRequest)}
      />
    </>
  );
};

export default RequestScreen;
