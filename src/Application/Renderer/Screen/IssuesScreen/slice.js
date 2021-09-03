import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Worklog from '../../../../Domain/Worklog/Worklog';
import JiraAPI from '../../../../Infrastructure/JiraAPI/JiraAPI';
import StateStorage from '../../../../Infrastructure/Storage/StateStorage';
import { showCommentSavedNotification, showWorklogAddedNotification } from '../../Notifications';

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
  },
  reducers: {
    setSearchQuery: (state, action) => {
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

const {
  setIssues,
  setSearchQuery,
  setForceReload,
  setCurrentIssue,
  setCurrentWorklog,
  setWorklogComment,
} = issueListSlice.actions;

export {
  issueListReducer,
  issueListSlice,
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
  setIssues,
  setSearchQuery,
  setForceReload,
  setCurrentIssue,
  setCurrentWorklog,
  setWorklogComment,
  loadIssuesAsync,
  addIssueWorklogAsync,
  saveWorklogCommentAsync,
};
