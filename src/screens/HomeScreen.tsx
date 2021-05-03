import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/header/Header";
import { LoadingListPlaceholder } from "../components/loading/LoadingListPlaceholder";

const HomeScreen: FC<NoProps> = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.application);
  return (
    <Fragment>
      {isLoggedIn && <Header />}
      <div className="flex-1 w-full divide-y divide-gray-300 ">
        <LoadingListPlaceholder />
      </div>
    </Fragment>
  );
};

export default HomeScreen;
