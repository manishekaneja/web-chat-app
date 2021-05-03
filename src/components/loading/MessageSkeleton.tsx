import { FC } from "react";

const MessageSkeleton: FC<NoProps & { direction?: "left" | "right" }> = ({
  direction = "right",
}) => {
  return (
    <div
      className={`py-2 px-4 flex ${
        direction === "left" ? " justify-start " : " justify-end "
      }`}
    >
      <div
        className={`bg-white bg-opacity-60 px-4 py-1 w-2/3  ${
          direction === "left" ? " rounded-br-2xl " : " rounded-bl-2xl "
        }  rounded-t-2xl `}
      >
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="flex">
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              <div className="flex-1"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MessageSkeleton };
