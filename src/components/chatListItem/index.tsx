import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Skeleton } from "../loading/Skeleton";

const GenericRowItem: FC<
  LoadingProps & {
    path?: string;
    right?: React.ReactNode;
    left?: React.ReactNode;
  }
> = ({ loading = true, path, left = null, right = null }) => {
  const history = useHistory();
  return (
    <button
      onClick={() => {
        if (path) {
          history.push(path);
        }
      }}
      className="px-2 py-1 w-full border-b border-gray-300 "
    >
      {loading ? (
        <Skeleton />
      ) : (
        <div className="flex space-x-4 full-width">
          <div className="flex flex-none items-center justify-center">
            {left}
          </div>
          <div className="flex-1 flex items-center space-y-4 py-1">{right}</div>
        </div>
      )}
    </button>
  );
};

export { GenericRowItem };
