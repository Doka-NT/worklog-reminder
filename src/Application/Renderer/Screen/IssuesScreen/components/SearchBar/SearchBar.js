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

export default function SearchBar() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const searchQuery = useSelector(selectSearchQuery);
  const isCommentDialogVisible = useSelector(selectIsCommentDialogVisible);
  const isTimeDialogVisible = useSelector(selectIsTimeDialogVisible);

  const onChange = (e) => dispatch(setSearchQuery(e.target.value));

  useAutofocus(inputRef, true, [isCommentDialogVisible, isTimeDialogVisible]);

  useEffect(() => {
    inputRef.current.addEventListener('search', onChange);
    inputRef.current.value = searchQuery;

    return () => {
      inputRef.current?.removeEventListener('search', onChange);
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
