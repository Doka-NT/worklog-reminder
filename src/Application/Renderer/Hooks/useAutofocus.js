import { useEffect } from 'react';

export default function useAutofocus(inputRef, autofocus, dependencies = []) {
  useEffect(() => {
    if (autofocus && inputRef.current !== null) {
      setTimeout(() => {
        // todo: detect why ons-input has lag
        inputRef.current._input.focus();
      }, 500);
    }
  }, [autofocus, ...dependencies]);
}
