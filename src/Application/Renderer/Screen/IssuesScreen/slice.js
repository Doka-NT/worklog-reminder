import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import JiraAPI from "../../../../Infrastructure/JiraAPI/JiraAPI";
import StateStorage from "../../../../Infrastructure/Storage/StateStorage";

const loadIssuesAsync = createAsyncThunk(
    'IssueScreen/loadIssues',
    async (searchQuery, thunkApi) => {
        const state = thunkApi.getState();

        const storage = new StateStorage(state.settings)
        const jiraApi = new JiraAPI(storage)

        return await jiraApi.searchIssues(searchQuery, true)
    }
)

// const forceReload = () => {
//     return (dispatch, getState) => {
//         dispatch(setForceReload)
//     }
// }

const issueListSlice = createSlice({
    name: 'issueList',
    initialState: {
        searchQuery: '',
        isProgressBarVisible: false,
        issues: [],
        lastForceReloaded: null,
        currentIssue: null,
    },
    reducers: {
        setSearchQuery: (state, action) => {
            JiraAPI.flushCache()
            state.searchQuery = action.payload
        },
        setIssues: (state, action) => {
            state.issues = action.payload
        },
        setForceReload: state => {
            JiraAPI.flushCache()
            state.lastForceReloaded = new Date()
            state.searchQuery = ''
        },
        setCurrentIssue: (state, action) => {
            state.currentIssue = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadIssuesAsync.pending, (state) => {
            state.isProgressBarVisible = true
          })
          .addCase(loadIssuesAsync.fulfilled, (state, action) => {
            state.isProgressBarVisible = false
            state.issues = action.payload;
          });
      },
})

const issueListReducer = issueListSlice.reducer

const selectIssues = state => state.issueList.issues
const selectSearchQuery = state => state.issueList.searchQuery
const selectIsProgressBarVisible = state => state.issueList.isProgressBarVisible
const selectLastForceReloaded = state => state.issueList.lastForceReloaded
const selectCurrentIssue = state => state.issueList.currentIssue

const {setIssues, setSearchQuery, setForceReload, setCurrentIssue} = issueListSlice.actions

export {
    issueListReducer,
    issueListSlice,
    selectIssues,
    selectSearchQuery,
    selectIsProgressBarVisible,
    selectLastForceReloaded,
    selectCurrentIssue,
    setIssues,
    setSearchQuery,
    setForceReload,
    setCurrentIssue,
    loadIssuesAsync,
}