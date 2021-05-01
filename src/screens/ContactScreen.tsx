import { FC, Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ViewUserProfile } from "../components/chatListItem/ViewUserProfile";
import { LoadingListPlaceholder } from "../components/loading/LoadingListPlaceholder";
import { AtIcon } from "../Icons/AtIcon";
import { searchForContact } from "../redux/thunk/searchForContact";

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
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<UserInfo[]>([]);

  const onTypeQuery = useCallback(
    (query: string) => {
      setIsLoading(true);
      dispatch(searchForContact(query))
        .then(({ payload }) => {
          setQueryResult(payload as UserInfo[]);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => setIsLoading(false));
    },
    [dispatch]
  );

  return (
    <Fragment>
      <div className="flex-1 w-full">
        <input
          type="text"
          onChange={({ target: { value } }) => onTypeQuery(value.trim())}
          className="bg-white h-14 bg-opacity-50 px-2 w-full border-b border-gray-300 tracking-wide font-normal "
          placeholder="Search for a Contact"
        />
        {isLoading ? (
          <LoadingListPlaceholder />
        ) : queryResult.length > 0 ? (
          queryResult.map((singlePerson) => (
            <ViewUserProfile
              key={singlePerson.id}
              loading={isLoading}
              data={singlePerson}
            />
          ))
        ) : (
          <ContactDefaultLayout />
        )}
      </div>
    </Fragment>
  );
};

export default ContactScreen;
