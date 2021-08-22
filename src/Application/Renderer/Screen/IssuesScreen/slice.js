import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ons from 'onsenui';
import Worklog from "../../../../Domain/Worklog/Worklog";
import JiraAPI from "../../../../Infrastructure/JiraAPI/JiraAPI";
import StateStorage from "../../../../Infrastructure/Storage/StateStorage";

/**
 * 
 * @param {object} thunkApi 
 * @returns {JiraAPI}
 */
const createJiraApiFromThunkApi = (thunkApi) => {
    const state = thunkApi.getState();

    const storage = new StateStorage(state.settings)

    return new JiraAPI(storage)
}

const loadIssuesAsync = createAsyncThunk(
    'IssueScreen/loadIssues',
    async (searchQuery, thunkApi) => {

        return await createJiraApiFromThunkApi(thunkApi)
            .searchIssues(searchQuery, true)
    }
)

const addIssueWorklogAsync = createAsyncThunk(
    'IssueScreen/saveWorklog',
    async (minutes, thunkApi) => {
        const issue = thunkApi.getState().issueList.currentIssue
        const worklog = new Worklog(issue, minutes)
console.log('add worklog')
        return await createJiraApiFromThunkApi(thunkApi)
            .addWorklog(worklog)
    }
)


const issueListSlice = createSlice({
    name: 'issueList',
    initialState: {
        searchQuery: '',
        isProgressBarVisible: false,
        issues: [],
        lastForceReloaded: null,
        currentIssue: null,
        isTimeProgressVisible: false,
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
            })
            .addCase(addIssueWorklogAsync.pending, state => {
                state.isTimeProgressVisible = true
            })
            .addCase(addIssueWorklogAsync.fulfilled, state => {
                console.log('fulfilled')
                ons.notification.toast('Worklog added!', { timeout: 1000 })
                state.currentIssue = null
                state.isTimeProgressVisible = false
            })
    },
})

const issueListReducer = issueListSlice.reducer

const selectIssues = state => state.issueList.issues
const selectSearchQuery = state => state.issueList.searchQuery
const selectIsProgressBarVisible = state => state.issueList.isProgressBarVisible
const selectLastForceReloaded = state => state.issueList.lastForceReloaded
const selectCurrentIssue = state => state.issueList.currentIssue
const selectIsTimeProgressVisible = state => state.issueList.isTimeProgressVisible

const { setIssues, setSearchQuery, setForceReload, setCurrentIssue } = issueListSlice.actions

export {
    issueListReducer,
    issueListSlice,
    selectIssues,
    selectSearchQuery,
    selectIsProgressBarVisible,
    selectLastForceReloaded,
    selectIsTimeProgressVisible,
    selectCurrentIssue,
    setIssues,
    setSearchQuery,
    setForceReload,
    setCurrentIssue,
    loadIssuesAsync,
    addIssueWorklogAsync as addIssueWorklog,
};
