import { createSlice } from "@reduxjs/toolkit";

const welcomeScreenSlice = createSlice({
    name: 'welcomeScreen',
    initialState: {},
    reducers: {},
})

const welcomeScreenReducer = welcomeScreenSlice.reducer

export {
    welcomeScreenReducer,
    welcomeScreenSlice,
}