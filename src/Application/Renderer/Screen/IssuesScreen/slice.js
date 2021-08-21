import { createSlice } from "@reduxjs/toolkit";

const issueListSlice = createSlice({
    name: 'issueList',
    initialState: {
        issues: [],
    },
    reducers: {
        setIssues: (state, action) => {
            state.issues = action.payload
        }
    }
})

const issueListReducer = issueListSlice.reducer

const selectIssues = state => state.issueList.issues

const {setIssues} = issueListSlice.actions

export {
    issueListReducer,
    issueListSlice,
    selectIssues,
    setIssues,
}