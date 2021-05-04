import { FC } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { CrossIcon } from "../../Icons/CrossIcon";
const ChatHeader: FC<{
  title?: string;
  data: Pick<ChatHistory, "alias" | "roomPhoto"> | null;
  isOnline: boolean;
  showStatus: boolean;
}> = ({ data, title = "Messages", isOnline, showStatus }) => {
  const { goBack } = useHistory();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <div className="dark-green w-full sticky top-0 z-30">
        <div className="text-white py-4 px-4 flex space-x-4">
          <div className="flex flex-none items-center justify-center">
            <button onClick={goBack}>
              <CrossIcon size={24} />
            </button>
          </div>
          {data && (
            <>
              <div className="flex flex-none items-center justify-center">
                <img
                  src={data.roomPhoto}
                  alt={data.alias}
                  className="h-12 w-12 bg-gray-700 overflow-x-hidden bg-opacity-50 rounded-full shadow-sm"
                />
              </div>
              <div className="flex-1 flex items-center space-x-2 py-1 font-medium text-xl">
                <p>{data.alias}</p>
                {showStatus ? (
                  isOnline ? (
                    <span className="h-2 w-2 mt-2 bg-green-300 rounded-full" />
                  ) : (
                    <span className="h-2 w-2 mt-2 bg-red-300 rounded-full" />
                  )
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export { ChatHeader };
