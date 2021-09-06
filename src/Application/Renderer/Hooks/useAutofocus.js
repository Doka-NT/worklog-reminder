import { useEffect } from 'react';

export default function useAutofocus(inputRef, autofocus, dependencies = []) {
  useEffect(() => {
    if (autofocus && inputRef.current !== null) {
      setTimeout(() => {
        // todo: detect why ons-input has lag
        if (inputRef && inputRef.current && inputRef.current._input) {
          inputRef.current._input.focus();
        } else {
          console.warn('[useAutofocus] - Not a suitable object', inputRef);
        }
      }, 500);
    }
  }, [autofocus, ...dependencies]);
}
