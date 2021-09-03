import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Worklog from '../../../../Domain/Worklog/Worklog';
import JiraAPI from '../../../../Infrastructure/JiraAPI/JiraAPI';
import StateStorage from '../../../../Infrastructure/Storage/StateStorage';
import {
  showCommentSavedNotification,
  showRequestFailedWarning,
  showWorklogAddedNotification,
} from '../../Notifications';
import EventEmitter from '../../../../Domain/EventEmitter';
import EventDict from '../../../../Domain/Dictionary/EventDict';

/**
 *
 * @param {object} thunkApi
 * @returns {JiraAPI}
 */
const createJiraApiFromThunkApi = (thunkApi) => {
  const state = thunkApi.getState();

  const storage = new StateStorage(state.settings);

  return new JiraAPI(storage);
};

const loadIssuesAsync = createAsyncThunk(
  'IssueScreen/loadIssues',
  async (searchQuery, thunkApi) => createJiraApiFromThunkApi(thunkApi)
    .searchIssues(searchQuery, true),
);

const addIssueWorklogAsync = createAsyncThunk(
  'IssueScreen/saveWorklog',
  async (minutes, thunkApi) => {
    const issue = thunkApi.getState().issueList.currentIssue;
    const worklog = new Worklog(issue, minutes);
    const jiraAPI = createJiraApiFromThunkApi(thunkApi);

    return worklog.save(jiraAPI);
  },
);

const saveWorklogCommentAsync = createAsyncThunk(
  'IssueScreen/saveWorklogComment',
  async (comment, thunkApi) => {
    const worklog = thunkApi.getState().issueList.currentWorklog;
    const jiraAPI = createJiraApiFromThunkApi(thunkApi);

    return jiraAPI.updateWorklog(worklog, comment);
  },
);

const issueListSlice = createSlice({
  name: 'issueList',
  initialState: {
    searchQuery: '',
    isProgressBarVisible: false,
    issues: [],
    lastForceReloaded: null,
    currentIssue: null,
    isTimeProgressVisible: false,
    isCommentProgressVisible: false,
    currentWorklog: null,
    worklogComment: '',
    listItemIndex: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      if (action.payload === state.searchQuery) {
        return;
      }

      JiraAPI.flushCache();
      state.searchQuery = action.payload;
    },
    setIssues: (state, action) => {
      state.issues = action.payload;
    },
    setForceReload: (state) => {
      JiraAPI.flushCache();
      state.lastForceReloaded = new Date();
      state.searchQuery = '';
    },
    setCurrentIssue: (state, action) => {
      state.currentIssue = action.payload;
    },
    setCurrentWorklog: (state, action) => {
      state.currentWorklog = action.payload;
      state.worklogComment = '';
    },
    setWorklogComment: (state, action) => {
      state.worklogComment = action.payload;
    },
    setListItemIndex: (state, action) => {
      state.listItemIndex = action.payload;
    },
    incListIndex: (state) => {
      const index = state.listItemIndex;
      const issueList = state.issues;

      let nextIndex = 0;

      if (index !== null) {
        nextIndex = index === issueList.length - 1 ? index : index + 1;
      }

      state.listItemIndex = nextIndex;
    },
    decListIndex: (state) => {
      const index = state.listItemIndex;

      let prevIndex = null;

      if (index !== null) {
        prevIndex = (index === 0 ? 0 : index - 1);
      }

      state.listItemIndex = prevIndex;
    },
    setCurrentIssueByIndex: (state) => {
      const index = state.listItemIndex;
      if (index === null) {
        return;
      }
      const issue = state.issues[index];

      state.currentIssue = issue;
    },
    resetListItemIndex: (state) => {
      if (state.listItemIndex !== null) {
        state.listItemIndex = null;
      }
    },
    openFocusedIssueInBrowser: (state) => {
      const index = state.listItemIndex;
      const issue = state.issues[index];

      EventEmitter.getInstance().send(EventDict.OPEN_IN_SHELL, issue.url);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIssuesAsync.pending, (state) => {
        state.isProgressBarVisible = true;
      })
      .addCase(loadIssuesAsync.fulfilled, (state, action) => {
        state.isProgressBarVisible = false;
        state.issues = action.payload;
      })
      .addCase(loadIssuesAsync.rejected, (state) => {
        state.isProgressBarVisible = false;
        showRequestFailedWarning();
      })
      .addCase(addIssueWorklogAsync.pending, (state) => {
        state.isTimeProgressVisible = true;
      })
      .addCase(addIssueWorklogAsync.fulfilled, (state, action) => {
        showWorklogAddedNotification();
        state.currentIssue = null;
        state.isTimeProgressVisible = false;
        state.currentWorklog = action.payload;
      })
      .addCase(saveWorklogCommentAsync.pending, (state) => {
        state.isCommentProgressVisible = true;
      })
      .addCase(saveWorklogCommentAsync.fulfilled, (state) => {
        showCommentSavedNotification();
        state.isCommentProgressVisible = false;
        state.currentWorklog = null;
      });
  },
});

const issueListReducer = issueListSlice.reducer;

const selectIssues = (state) => state.issueList.issues;
const selectSearchQuery = (state) => state.issueList.searchQuery;
const selectIsProgressBarVisible = (state) => state.issueList.isProgressBarVisible;
const selectLastForceReloaded = (state) => state.issueList.lastForceReloaded;
const selectCurrentIssue = (state) => state.issueList.currentIssue;
const selectIsTimeProgressVisible = (state) => state.issueList.isTimeProgressVisible;
const selectCurrentWorklog = (state) => state.issueList.currentWorklog;
const selectIsCommentProgressVisible = (state) => state.issueList.isCommentProgressVisible;
const selectWorklogComment = (state) => `${state.issueList.worklogComment}`.trim();
const selectIsTimeDialogVisible = (state) => state.issueList.currentIssue !== null;
const selectIsCommentDialogVisible = (state) => state.issueList.currentWorklog !== null;
const selectListItemIndex = (state) => state.issueList.listItemIndex;

const {
  setIssues,
  setSearchQuery,
  setForceReload,
  setCurrentIssue,
  setCurrentWorklog,
  setWorklogComment,
  setListItemIndex,
  incListIndex,
  decListIndex,
  setCurrentIssueByIndex,
  openFocusedIssueInBrowser,
  resetListItemIndex,
} = issueListSlice.actions;

export {
  issueListReducer,
  issueListSlice,
  // Selectors
  selectIssues,
  selectSearchQuery,
  selectIsProgressBarVisible,
  selectLastForceReloaded,
  selectIsTimeProgressVisible,
  selectCurrentIssue,
  selectCurrentWorklog,
  selectIsCommentProgressVisible,
  selectWorklogComment,
  selectIsTimeDialogVisible,
  selectIsCommentDialogVisible,
  selectListItemIndex,
  // Reducers
  setIssues,
  setSearchQuery,
  setForceReload,
  setCurrentIssue,
  setCurrentWorklog,
  setWorklogComment,
  setListItemIndex,
  incListIndex,
  decListIndex,
  setCurrentIssueByIndex,
  openFocusedIssueInBrowser,
  resetListItemIndex,
  // Async Reducers
  loadIssuesAsync,
  addIssueWorklogAsync,
  saveWorklogCommentAsync,
};
