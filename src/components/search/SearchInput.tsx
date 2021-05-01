import { FC, useCallback, useRef, useState } from "react";
import { CrossIcon } from "../../Icons/CrossIcon";
import { LoaderIcon } from "../../Icons/LoaderIcon";
import { SearchIcon } from "../../Icons/SearchIcon";
import debounce from "../../util/debounce";
import { emptyFunction } from "../../util/emptyFunc";

const SearchInput: FC<SearrchInputProps> = ({
  debouncedChange = emptyFunction,
  debouncedTime = 400,
  onChange = emptyFunction,
  onClear = emptyFunction,
  loading = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [queryString, setQueryString] = useState<string>("");
  const deboundedChange = useCallback(
    debounce(debouncedChange, debouncedTime),
    [debouncedTime, debouncedChange]
  );
  const onValueChange = useCallback(
    ({ target: { value } }) => {
      setQueryString(value.trim());
      onChange(value);
      deboundedChange(value);
      if (value.trim() === "") {
        onClear();
      }
    },
    [deboundedChange, onChange, onClear]
  );
  const onButtonPress = useCallback(() => {
    if (loading) {
      return;
    }
    if (queryString === "") {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      setQueryString("");
      onClear();
    }
  }, [loading, onClear, queryString]);

  const buttonRenderer = useCallback(
    (loading: boolean, queryString: string) => {
      if (loading) {
        return <LoaderIcon size={20} />;
      }
      if (queryString === "") {
        return <SearchIcon size={20} />;
      } else {
        return <CrossIcon size={20} />;
      }
    },
    []
  );

  return (
    <div className="flex p-0">
      <input
        ref={inputRef}
        type="text"
        value={queryString}
        onChange={onValueChange}
        className="flex-1 bg-white h-14 bg-opacity-50 px-2 w-full border-b border-gray-300 tracking-wide font-normal "
        placeholder="Search for a New Contact"
      />
      <button
        onClick={onButtonPress}
        className="text-lg text-gray-500 bg-white h-14 bg-opacity-50 px-2 border-b border-gray-300"
      >
        {buttonRenderer(loading, queryString)}
      </button>
    </div>
  );
};

export default SearchInput;
