import { useCallback, useEffect, useState } from "react";

function useDebounce<P extends any[]>(
  callback: (...args: P) => any,
  waitTime: number
) {
  const debounce = useCallback<
    (action: (...args: P) => any, time: number) => (...args: P) => any
  >((action: (...args: P) => any, time: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: P) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        timeout = null;
        action(...args);
      }, time);
    };
  }, []);
  const [debouncedFuntion, setDebouncedFuntion] = useState<(...args: P) => any>(
    () => {}
  );
  useEffect(() => {
    setDebouncedFuntion(() => debounce(callback, waitTime));
  }, [callback, waitTime, debounce]);
  return debouncedFuntion || (() => {});
}

export default useDebounce;
