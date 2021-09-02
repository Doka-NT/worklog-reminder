import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectVisibleSlide, showNext } from '../slice';

export default function SlideInput(_props) {
  const defaults = {
    focusedOnIndex: null,
    modifier: 'underbar',
    autoFocus: false,
    style: {
      width: '100%',
    },
    onChange: () => { },
  };

  const props = { ...defaults, ..._props };

  const dispatch = useDispatch();
  const currentSlideIndex = useSelector(selectVisibleSlide);
  const inputRef = useRef(null);

  const autofocus = currentSlideIndex === props.focusedOnIndex;

  const onEnter = (e) => {
    if (e.code.toLowerCase() !== 'enter') {
      return;
    }

    dispatch(showNext());
  };

  const preventTab = (e) => {
    if (e.code.toLowerCase() === 'tab') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (autofocus && inputRef.current._input) {
      inputRef.current._input.focus();
    }

    inputRef.current.onchange = (e) => {
      const event = {
        type: e.type,
        value: e.target.value,
        originEvent: e,
      };

      props.onChange(event);
    };
  }, [autofocus]);

  return (
    <ons-input
      ref={inputRef}
      {...props}
      onKeyPress={onEnter}
      onKeyDown={preventTab}
    />
  );
}
