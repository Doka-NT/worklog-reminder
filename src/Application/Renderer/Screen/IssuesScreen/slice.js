import { createSlice } from "@reduxjs/toolkit";

const issueListSlice = createSlice({
    name: 'issueList',
    initialState: {
        searchQuery: '',
        issues: [],
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        setIssues: (state, action) => {
            state.issues = action.payload
        }
    }
})

const issueListReducer = issueListSlice.reducer

const selectIssues = state => state.issueList.issues
const selectSearchQuery = state => state.issueList.searchQuery

const {setIssues, setSearchQuery} = issueListSlice.actions

export {
    issueListReducer,
    issueListSlice,
    selectIssues,
    selectSearchQuery,
    setIssues,
    setSearchQuery,
}