import { FC, Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ViewUserProfile } from "../components/chatListItem/ViewUserProfile";
import { LoadingListPlaceholder } from "../components/loading/LoadingListPlaceholder";
import SearchInput from "../components/search/SearchInput";
import { AddUserIcon } from "../Icons/AddUserIcon";
import { CrossIcon } from "../Icons/CrossIcon";
import { searchForContact } from "../redux/thunk/searchForContact";

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

const NotFoundLayout = () => (
  <div className="flex items-center justify-end flex-col h-96">
    <h3 className="text-green-900 opacity-70 mb-10">
      <CrossIcon size={100} />
    </h3>
    <p className="text-center text-green-900 opacity-70 font-bold">
      Can't find the results you are searching for
    </p>
  </div>
);

const RequestScreen: FC<NoProps> = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<UserInfo[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const onTypeQuery = useCallback(
    (query: string) => {
      setIsSearching(query.trim().length > 0);
      if (query.trim().length > 0) {
        dispatch(searchForContact(query.trim()))
          .then(({ payload }) => {
            setQueryResult(payload as UserInfo[]);
          })
          .catch((error) => {
            console.log(error.message);
          })
          .finally(() => setIsLoading(false));
      } else {
        setQueryResult([]);
      }
    },
    [dispatch]
  );
  const setLoader = useCallback(() => setIsLoading(true), []);
  const resetLoader = useCallback(() => {
    setIsSearching(false);
    setIsLoading(false);
  }, []);

  const renderSearchView = useCallback((queryResult: UserInfo[]) => {
    return (
      <>
        {queryResult.length > 0 ? (
          queryResult.map((singlePerson) => (
            <ViewUserProfile
              key={singlePerson.id}
              loading={isLoading}
              currentState="unknown"
              data={singlePerson}
            />
          ))
        ) : (
          <NotFoundLayout />
        )}
      </>
    );
  }, []);

  const renderRenderRequestView = useCallback(() => {}, []);
  return (
    <Fragment>
      <div className="flex-1 w-full">
        <SearchInput
          onChange={setLoader}
          onClear={resetLoader}
          debouncedChange={onTypeQuery}
          debouncedTime={700}
          loading={isLoading}
        />
        {isLoading ? (
          <LoadingListPlaceholder />
        ) : isSearching ? (
          renderSearchView(queryResult)
        ) : (
          <RequestDefaultLayout />
        )}
      </div>
    </Fragment>
  );
};

export default RequestScreen;
