import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        host: '',
        username: '',
        token: '',
    },
    reducers: {
        setHost: (state, action) => {state.host = action.payload},
        setUsername: (state, action) => {state.username = action.payload},
        setToken: (state, action) => {state.token = action.payload},
    }
})

const selectHost = state => state.settings.host
const selectUsername = state => state.settings.username
const selectToken = state => state.settings.token

const { setHost, setUsername, setToken } = settingsSlice.actions

const settingsReducer = settingsSlice.reducer

export {
    settingsReducer,
    settingsSlice,
    selectHost,
    selectUsername,
    selectToken,
    setHost,
    setUsername,
    setToken,
}