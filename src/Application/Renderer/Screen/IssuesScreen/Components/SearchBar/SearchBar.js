import 'onsenui';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAutofocus from '../../../../Hooks/useAutofocus';
import {
  selectIsCommentDialogVisible,
  selectIsTimeDialogVisible,
  selectSearchQuery,
  setSearchQuery,
} from '../../slice';

const FOCUS_UPDATE_INTERVAL = 10000;

export default function SearchBar() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const searchQuery = useSelector(selectSearchQuery);
  const isCommentDialogVisible = useSelector(selectIsCommentDialogVisible);
  const isTimeDialogVisible = useSelector(selectIsTimeDialogVisible);

  const onChange = (e) => dispatch(setSearchQuery(e.target.value));
  const isAutofocused = !isCommentDialogVisible && !isTimeDialogVisible;

  useAutofocus(inputRef, isAutofocused, [isCommentDialogVisible, isTimeDialogVisible]);

  useEffect(() => {
    inputRef.current.addEventListener('search', onChange);
    inputRef.current.value = searchQuery;

    const focusTimer = setInterval(() => {
        if (isAutofocused) {
          inputRef.current?._input?.focus()
        }
    }, FOCUS_UPDATE_INTERVAL);

    return () => {
      inputRef.current?.removeEventListener('search', onChange);
      clearInterval(focusTimer);
    };
  });

  return (
    <ons-search-input
      ref={inputRef}
      type="search"
      style={{ width: '100%' }}
      value={searchQuery}
      placeholder="Search"
    />
  );
}
