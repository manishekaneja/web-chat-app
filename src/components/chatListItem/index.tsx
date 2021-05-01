import React, { FC } from "react";
import { Skeleton } from "../loading/Skeleton";

const GenericRowItem: FC<
  LoadingProps & {
    right?: React.ReactNode;
    left?: React.ReactNode;
  }
> = ({ loading = true, left = null, right = null }) => {
  return (
    <div className="px-2 py-1 border-b border-gray-300 ">
      {loading ? (
        <Skeleton />
      ) : (
        <div className="flex space-x-4 full-width">
          <div className="flex items-center justify-center">{left}</div>
          <div className="flex-1 flex items-center space-y-4 py-1">{right}</div>
        </div>
      )}
    </div>
  );
};

export { GenericRowItem };
