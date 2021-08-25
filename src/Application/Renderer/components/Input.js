import 'onsenui';
import { useEffect, useRef } from 'react';
import useAutofocus from '../Hooks/useAutofocus';

const createEvent = (e) => ({
  type: e.type,
  value: e.target.value,
  originEvent: e,
});

export default function Input(_props) {
  const defaults = {
    isFocused: false,
    value: '',
    onChange: () => { },
    onEnter: () => { },
  };

  const props = { ...defaults, ..._props };

  const inputRef = useRef(null);

  const onEnter = (e) => {
    if (e.code.toLowerCase() !== 'enter') {
      return;
    }

    props.onEnter(e);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onchange = (e) => props.onChange(createEvent(e));
      inputRef.current.value = props.value;
    }
  });

  useAutofocus(inputRef, props.isFocused);

  return <ons-input ref={inputRef} {...props} onKeyPress={onEnter} />;
}
