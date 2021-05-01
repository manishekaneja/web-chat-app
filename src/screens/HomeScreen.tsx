import { FC, Fragment } from "react";
import { LoadingListPlaceholder } from "../components/loading/LoadingListPlaceholder";

const HomeScreen: FC<NoProps> = () => {
  return (
    <Fragment>
      <div className="flex-1 w-full divide-y divide-gray-300 ">
        <LoadingListPlaceholder />
      </div>
    </Fragment>
  );
};

export default HomeScreen;
