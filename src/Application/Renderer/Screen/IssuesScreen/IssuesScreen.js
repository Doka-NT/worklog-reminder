import { useEffect, useRef } from 'react';
import { Page } from 'react-onsenui';
import { useDispatch, useSelector } from 'react-redux';
import EventDict from '../../../../Domain/Dictionary/EventDict';
import ProgressLine from '../../Components/ProgressLine';
import Spinner from '../../Components/Spinner';
import CommentDialog from './Components/CommentDialog/CommentDialog';
import IssueList from './Components/IssueList/IssueList';
import IssuesToolbar from './Components/IssuesToolbar';
import SearchBar from './Components/SearchBar/SearchBar';
import TimeDialog from './Components/TimeDialog/TimeDialog';
import {
  decListIndex,
  incListIndex,
  loadIssuesAsync,
  selectIsProgressBarVisible,
  selectIssues,
  selectLastForceReloaded,
  selectSearchQuery,
  setCurrentIssueByIndex,
  openFocusedIssueInBrowser,
} from './slice';
import './style.less';

const { ipcRenderer } = window.require('electron');

export default function IssuesScreen() {
  const dispatch = useDispatch();

  const issueList = useSelector(selectIssues);
  const searchQuery = useSelector(selectSearchQuery);
  const isProgressBarVisible = useSelector(selectIsProgressBarVisible);
  const lastForceReloaded = useSelector(selectLastForceReloaded);

  const screenRef = useRef(null);
  const issueListRef = useRef(null);

  const issueComponent = issueList.length > 0 || searchQuery !== '' ? (
    <IssueList issues={issueList} />
  ) : (
    <Spinner />
  );

  useEffect(() => {
    if (!issueListRef.current) {
      return;
    }

    issueListRef.current.scrollTop = 0;
  }, [issueList]);

  const intervalUpdateListener = () => {
    const isScreenVisible = document.querySelectorAll('.screen-issues').length > 0;
    const isWindowVisible = ipcRenderer.sendSync(
      EventDict.SYNC_IS_WINDOW_VISIBLE,
    );

    if (!isScreenVisible || isWindowVisible) {
      return;
    }

    dispatch(loadIssuesAsync(searchQuery));
  };

  useEffect(() => {
    document.addEventListener(EventDict.RELOAD_ISSUES, intervalUpdateListener);
    dispatch(loadIssuesAsync(searchQuery));

    return () => {
      document.removeEventListener(
        EventDict.RELOAD_ISSUES,
        intervalUpdateListener,
      );
    };
  }, [searchQuery, lastForceReloaded]);

  const scrollToViewListItem = () => {
    document.querySelectorAll('.issue-list-item.focused').forEach((el) => el.scrollIntoView({ block: 'nearest' }));
  };

  useEffect(() => {
    if (!screenRef || !screenRef.current) {
      return () => {};
    }

    const onKeyPress = (e) => {
      if (e.key === 'ArrowDown') {
        dispatch(incListIndex());
        scrollToViewListItem();
      } else if (e.key === 'ArrowUp') {
        dispatch(decListIndex());
        scrollToViewListItem();
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        dispatch(openFocusedIssueInBrowser());
      } else if (e.key === 'Enter') {
        if (e.target.value === searchQuery) {
          dispatch(setCurrentIssueByIndex());
        }
      }
    };

    const el = screenRef.current;
    el.addEventListener('keydown', onKeyPress);

    return () => {
      el.removeEventListener('keydown', onKeyPress);
    };
  });

  return (
    <section ref={screenRef} className="screen screen-issues">
      <Page className="issue-page" renderToolbar={() => <IssuesToolbar />}>
        <SearchBar />

        <ProgressLine isVisible={isProgressBarVisible} />

        <div ref={issueListRef} id="issues-list" className="issue-list center">
          {issueComponent}
        </div>

        <TimeDialog />
        <CommentDialog />
      </Page>
    </section>
  );
}
