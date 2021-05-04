import _ from "lodash";
import moment from "moment";
import { FC } from "react";
import { useSelector } from "react-redux";
import { GenericRowItem } from ".";

const ChatHistoryRowItem: FC<
  LoadingProps & {
    path?: string;
    data?: ChatHistory;
  }
> = ({ path, loading = true, data = null }) => {
  const id = useSelector((data: RootState) => data.user.id);
  return (
    <GenericRowItem
      path={path}
      state={{
        alias: data ? data.alias : "",
        roomPhoto: data ? data.roomPhoto : "",
        createdBy: data ? data.createdBy : "",
        members: data
          ? _.filter(data.members, (member) => member.id !== id)
          : [],
      }}
      loading={loading || !data}
      left={
        data && (
          <img
            src={data.roomPhoto}
            alt={data.alias}
            className="h-12 w-12 bg-gray-700 overflow-x-hidden bg-opacity-50 rounded-full shadow-sm"
          />
        )
      }
      right={
        data && (
          <div className="flex-1 space-y py-1">
            <div className="flex">
              <div className="flex flex-initial whitespace-nowrap overflow-ellipsis overflow-hidden text-gray-800 font-bold ">
                {data.alias}
              </div>
              <div className="flex-1"></div>
              <div className="flex flex-none  text-xs text-gray-800 items-center justify-start ">
                {moment(data.updatedAt).isBefore(1, "day")
                  ? moment(data.updatedAt).format("DD/MM/yy hh:mm A")
                  : moment(data.updatedAt).format("hh:mm A")}
              </div>
            </div>
            <div className="space-y">
              <p className="text-gray-700 font-normal text-xs">
                {data.lastMessage}
              </p>
            </div>
          </div>
        )
      }
    />
  );
};

export { ChatHistoryRowItem };
