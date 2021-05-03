import { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CrossIcon } from "../../Icons/CrossIcon";

const ChatHeader: FC<{ data: PublicProfile }> = ({ data }) => {
  const { roomid } = useParams<{ roomid: string }>();
  console.log(roomid);
  const { goBack } = useHistory();
  return (
    <div className="dark-green w-full sticky top-0 z-30">
      <div className="text-white py-4 px-4 flex space-x-4">
        <div className="flex flex-none items-center justify-center">
          <button onClick={goBack}>
            <CrossIcon size={24} />
          </button>
        </div>
        <div className="flex flex-none items-center justify-center">
          <img
            src={data.profilePhoto}
            alt={data.name}
            className="h-12 w-12 bg-gray-700 overflow-x-hidden bg-opacity-50 rounded-full shadow-sm"
          />
        </div>
        <div className="flex-1 flex items-center space-y-4 py-1 font-bold text-2xl">
          <p>
            {data.name} - {data && (data.isOnline ? "Online" : "Offline")}
          </p>
        </div>
      </div>
    </div>
  );
};

export { ChatHeader };
