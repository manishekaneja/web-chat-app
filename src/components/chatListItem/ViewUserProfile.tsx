import { FC, Fragment } from "react";
import { GenericRowItem } from ".";
import { AllowedUserAction } from "./AllowedUserAction";

const ViewUserProfile: FC<
  LoadingProps & {
    path?: string;
    data?: PublicProfile;
    currentState?: "unknown" | "friend" | "sendRequest" | "recievedRequest";
  }
> = ({ path, loading = true, data = null, currentState }) => {
  return (
    <GenericRowItem
      path={path}
      loading={loading || !data}
      left={
        data && (
          <img
            src={data.profilePhoto}
            alt={data.name}
            className="h-12 w-12 bg-gray-700 overflow-x-hidden bg-opacity-50 rounded-full shadow-sm"
          />
        )
      }
      right={
        data && (
          <Fragment>
            <div className="flex flex-initial whitespace-nowrap overflow-ellipsis overflow-hidden ">
              {data.name}
            </div>
            <div className="flex-1"></div>
            <AllowedUserAction {...{ data, currentState }} />
          </Fragment>
        )
      }
    />
  );
};

export { ViewUserProfile };
