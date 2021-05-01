import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { ErrorIcon } from "../Icons/ErrorIcon";

const ErrorScreen: FC<NoProps> = () => {
  return (
    <Fragment>
      <div className=" w-full h-full flex items-center justify-center max-h-96">
        <div className="flex flex-col items-center justify-center">
          <div>
            <span className="text-yellow-300">
              <ErrorIcon size={200} />
            </span>
          </div>
          <p>Unable to Find to Screen you are trying to find.</p>
          <p className="underline text-blue-700">
            <Link to="/">Go back to Dashboard</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default ErrorScreen;
