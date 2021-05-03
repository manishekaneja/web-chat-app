import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ViewUserProfile } from "../components/chatListItem/ViewUserProfile";
import { Header } from "../components/header/Header";
import SearchSection from "../components/search/SearchSection";
import { Routes } from "../constants/Routes";
import { AtIcon } from "../Icons/AtIcon";
import { getUserInfoThunk } from "../redux/thunk/getUserInfoThunk";

const ContactDefaultLayout = () => (
  <div className="flex items-center justify-end flex-col h-96">
    <h3 className="text-green-900 opacity-70 mb-10">
      <AtIcon size={150} />
    </h3>
    <p className="text-center text-green-900 opacity-70 font-bold">
      Search For a Contact Here
    </p>
  </div>
);

const ContactScreen: FC<NoProps> = () => {
  const { friends } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  useEffect(() => {
    dispatch(getUserInfoThunk());
}, [dispatch]);
  const { isLoggedIn } = useSelector((state: RootState) => state.application);
  const { id } = useSelector((state: RootState) => state.user);
  const genrateID = useCallback((id1, id2) => {
    if (!id1 || !id2) {
      return "";
    } else {
      return id1 > id2 ? id1 + id2 : id2 + id1;
    }
  }, []);

  const renderFriendsList = useCallback(
    (friends: PublicProfile[]) => (showDefault: boolean) => {
      if (friends.length <= 0 && showDefault) {
        return <ContactDefaultLayout />;
      }
      return (
        <>
          {friends.length > 0 && (
            <div className="relative">
              <div className="sticky top-14 bg-white shadow">
                <h2 className=" text-green-700 text-base px-2 py-2 bg-green-700 bg-opacity-10 border-b border-green-700 font-bold">
                  Contacts
                </h2>
              </div>
              {friends.map((singlePerson) => (
                <ViewUserProfile
                  path={`${Routes.room}/${genrateID(singlePerson.id, id)}`}
                  key={singlePerson.id}
                  loading={false}
                  currentState="friend"
                  data={singlePerson}
                />
              ))}
            </div>
          )}
        </>
      );
    },
    [genrateID, id]
  );

  return (
    <>
      {isLoggedIn && <Header />}

      <SearchSection rendererFunc={renderFriendsList(friends)} />
    </>
  );
};

export default ContactScreen;
