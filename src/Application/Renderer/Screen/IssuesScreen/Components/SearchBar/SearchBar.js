import 'onsenui';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';
import useAutofocus from '../../../../Hooks/useAutofocus';
import EventDict from '../../../../../../Domain/Dictionary/EventDict';
import {
  resetListItemIndex,
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

  const onChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  const isAutofocused = !isCommentDialogVisible && !isTimeDialogVisible;

  useAutofocus(inputRef, isAutofocused, [isCommentDialogVisible, isTimeDialogVisible]);

  useEffect(() => {
    inputRef.current.addEventListener('search', onChange);
    inputRef.current.value = searchQuery;

    const focusTimer = setInterval(() => {
      const searchInput = inputRef.current?._input;
      const isWindowVisible = ipcRenderer.sendSync(EventDict.SYNC_IS_WINDOW_VISIBLE);

      if (isAutofocused && searchInput && !isWindowVisible) {
        searchInput.focus();
        searchInput.select();
      }
    }, FOCUS_UPDATE_INTERVAL);

    return () => {
      inputRef.current?.removeEventListener('search', onChange);
      clearInterval(focusTimer);
    };
  });

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
    }

    if (e.key.length === 1) {
      dispatch(resetListItemIndex());
    }
  };

  return (
    <ons-search-input
      ref={inputRef}
      type="search"
      style={{ width: '100%' }}
      value={searchQuery}
      placeholder="Search"
      onKeyDown={onKeyDown}
    />
  );
}
