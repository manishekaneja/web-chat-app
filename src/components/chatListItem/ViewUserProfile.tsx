import { FC, Fragment } from "react";
import { GenericRowItem } from ".";
import { AllowedUserAction } from "./AllowedUserAction";

const ViewUserProfile: FC<
  LoadingProps & {
    data?: UserInfo;
    currentState?: "unknown" | "friend" | "sendRequest" | "recievedRequest";
  }
> = ({ loading = true, data = null, currentState }) => {
  return (
    <GenericRowItem
      loading={loading || !data}
      left={
        data && (
          <img
            src={data.profile}
            alt={data.name}
            className="h-12 w-12 bg-gray-700 overflow-x-hidden bg-opacity-50 rounded-full shadow-sm"
          />
        )
      }
      right={
        data && (
          <Fragment>
            <div className="flex flex-1">{data.name}</div>
            <div className="flex-1"></div>
            <AllowedUserAction {...{ data, currentState }} />
          </Fragment>
        )
      }
    />
  );
};

export { ViewUserProfile };
