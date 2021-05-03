import { FC, useCallback, useRef, useState } from "react";
import { SendRequestIcon } from "../../Icons/SendRequestIcon";
import { emptyFunction } from "../../util/emptyFunc";

const MessageInput: FC<{ onSubmit: (value: string) => void }> = ({
  onSubmit = emptyFunction,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [queryString, setQueryString] = useState<string>("");
  const onButtonPress = useCallback(() => {
    if (queryString === "") {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      onSubmit(queryString.trim());
      setQueryString("");
    }
  }, [queryString, onSubmit]);

  return (
    <div className="flex flex-none p-0 sticky top-0 z-20 space-x-4 py-1 px-2">
      <input
        ref={inputRef}
        type="text"
        value={queryString}
        onChange={({ target: { value } }) => setQueryString(value.trim())}
        className="flex-1 h-14 rounded-full px-5 bg-opacity-50 w-full border-b shadow border-gray-300 tracking-wide font-normal "
        placeholder="Enter message here"
      />
      <button
        onClick={onButtonPress}
        className="text-lg green w-14 flex items-center justify-center rounded-full text-white h-14 bg-opacity-50 px-2 border-b border-gray-300"
      >
        <SendRequestIcon size={28} />
      </button>
    </div>
  );
};

export default MessageInput;
