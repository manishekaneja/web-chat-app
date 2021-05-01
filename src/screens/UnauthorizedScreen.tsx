import { FC, Fragment } from "react";
import { Link } from "react-router-dom";

const UnauthorizedScreen: FC<NoProps> = () => {
  return (
    <Fragment>
      <div className=" w-full h-full flex items-center justify-center max-h-96">
        <div className="flex flex-col items-center justify-center">
          <p>Invalid Request</p>
          <p className="underline text-blue-700">
            <Link to="/">Go back to Dashboard</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default UnauthorizedScreen;
