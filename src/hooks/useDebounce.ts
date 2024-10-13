import { useCallback, useRef } from "react";

function useDebounce<
  F extends (...args: Parameters<F>) => void | Promise<void>
>(callback: F, delay: number = 1000) {
  const timeoutId = useRef<number | undefined>();

  const debounceCallbackFn = useCallback(
    (...args: Parameters<F>) => {
      clearTimeout(timeoutId?.current);
      timeoutId.current = setTimeout(() => {
        callback(...args);
      }, delay);

      return () => clearTimeout(timeoutId?.current);
    },
    [callback, delay]
  );

  return debounceCallbackFn;
}

export { useDebounce };
