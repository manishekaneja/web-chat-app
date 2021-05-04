import { FC } from "react";
import { Helmet } from "react-helmet";
import { useFirebaseLogin } from "../hooks/useFirebaseLogin";
import { ChatIcon } from "../Icons/ChatIcon";
import GoogleLogo from "../Icons/GoogleLogo";

const OnBoardingScreen: FC<NoProps> = () => {
  const { googleLogin } = useFirebaseLogin();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login to Chat-App</title>
      </Helmet>
      <div className=" w-full h-full teal-green flex flex-col items-stretch justify-center ">
        <div className="flex flex-col items-stretch justify-center p-10">
          <div className="flex justify-center flex-1 py-10">
            <span className="text-white">
              <ChatIcon size={200} />
            </span>
          </div>
          <div className="flex-0">
            <p className="text-white font-bold text-3xl">Welcome ,</p>
            <p className="text-white font-bold text-2xl">
              Let's get you registered
            </p>
            <button
              className="bg-white shadow p-2 my-10 w-full"
              onClick={googleLogin}
            >
              <span className="text-2xl font-bold">
                <GoogleLogo />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnBoardingScreen;
