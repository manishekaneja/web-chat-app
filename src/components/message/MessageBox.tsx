import moment from "moment";
import { FC } from "react";
import { ClockIcon } from "../../Icons/ClockIcon";
import { TickIcon } from "../../Icons/TickIcon";

const MessageBox: FC<{
  timestamp: Date;
  message: string;
  direction?: "left" | "right";
  sent: boolean;
}> = ({ sent, timestamp, message, direction = "right" }) => {
  return (
    <div
      className={`py-2 px-4 flex ${
        direction === "left" ? " justify-start " : " justify-end "
      }`}
    >
      <div
        className={` w-2/3 flex ${
          direction === "left" ? " justify-start " : " justify-end "
        }`}
      >
        <div
          style={{ background: direction === "right" ? "#dcf8c6" : "#fefefe" }}
          className={` px-4 py-1 max-w-full font-medium shadow  text-gray-800  ${
            direction === "left"
              ? " rounded-br-2xl  "
              : " rounded-bl-2xl bg-green-50  "
          }  rounded-t-2xl `}
        >
          <div className="flex flex-col w-full">
            <div className="flex-1 max-w-full">
              <p className="overflow-clip overflow-hidden break-words">
                {message}
              </p>
            </div>
            <div className="flex-1 max-w-full text-gray-600 font-normal text-xs flex justify-end items-center">
              <span className="font-bold">
                {direction === "right" &&
                  (sent ? <ClockIcon size={12} /> : <TickIcon strokeWidth="2.5" size={12} />)}
              </span>
              <p className="inline-flex flex-1 w-3"></p>
              <p>
                <span>{moment(timestamp).format("hh:mm A")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MessageBox };
