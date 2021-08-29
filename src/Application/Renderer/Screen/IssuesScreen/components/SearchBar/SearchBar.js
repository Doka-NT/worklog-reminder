import 'onsenui';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAutofocus from '../../../../Hooks/useAutofocus';
import { selectIsAllDialogHidden, selectSearchQuery, setSearchQuery } from '../../slice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const searchQuery = useSelector(selectSearchQuery);
  const isFocused = useSelector(selectIsAllDialogHidden)

  const onChange = (e) => dispatch(setSearchQuery(e.target.value));

  useAutofocus(inputRef, true, [isFocused]);
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
