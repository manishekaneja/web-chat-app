import React, { FC, Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { CrossIcon } from "../../Icons/CrossIcon";
import { searchForContact } from "../../redux/thunk/searchForContact";
import { ViewUserProfile } from "../chatListItem/ViewUserProfile";
import { LoadingListPlaceholder } from "../loading/LoadingListPlaceholder";
import SearchInput from "../search/SearchInput";

const NotFoundLayout = () => (
  <div className="flex items-center justify-center flex-col h-96">
    <h3 className="text-green-900 opacity-70 mb-10">
      <CrossIcon size={100} />
    </h3>
    <p className="text-center text-green-900 opacity-70 font-bold">
      Can't find the results you are searching for
    </p>
  </div>
);

const SearchSection: FC<
  NoProps & { rendererFunc: (flag: boolean) => React.ReactNode }
> = ({ rendererFunc }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<Array<PublicProfile>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const onTypeQuery = useCallback(
    (query: string) => {
      setIsSearching(query.trim().length > 0);
      if (query.trim().length > 0) {
        dispatch(searchForContact(query.trim()))
          .then(({ payload }) => {
            setQueryResult(payload as Array<PublicProfile>);
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

  const renderSearchView = useCallback(
    (queryResult: PublicProfile[], isLoading: boolean) => {
      return (
        <>
          {queryResult.length > 0 ? (
            queryResult.map((singlePerson) => (
              <ViewUserProfile
                key={singlePerson.id}
                loading={isLoading}
                currentState={singlePerson.status}
                data={singlePerson}
              />
            ))
          ) : (
            <NotFoundLayout />
          )}
        </>
      );
    },
    []
  );

  return (
    <Fragment>
      <div className="flex-1 w-full overflow-y-auto">
        <SearchInput
          onChange={setLoader}
          onClear={resetLoader}
          debouncedChange={onTypeQuery}
          debouncedTime={700}
          loading={isLoading}
        />
        {isLoading ? (
          <LoadingListPlaceholder />
        ) : (
          <>
            {isSearching && renderSearchView(queryResult, isLoading)}
            {rendererFunc(!isSearching)}
          </>
        )}
      </div>
    </Fragment>
  );
};

export default SearchSection;
