import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        screenName: '',
    },
    reducers: {
        showScreen: (state, action) => {
            state.screenName = action.payload
        },
    }
})

const selectScreenName = state => state.app.screenName

const {showScreen} = appSlice.actions

const appReducer = appSlice.reducer

export {
    appReducer,
    appSlice,
    selectScreenName,
    showScreen,
}