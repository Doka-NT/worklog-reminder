import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { appReducer } from "../appSlice";
import { welcomeScreenReducer } from "../Screen/WelcomeScreen/slice";

import { save, load } from "redux-localstorage-simple";
import { settingsReducer } from "./settingsSlice";
import { issueListReducer } from "../Screen/IssuesScreen/slice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        settings: settingsReducer,
        welcomeScreen: welcomeScreenReducer,
        issueList: issueListReducer,
    },
    middleware: [
        save({states: ['settings']}),
        thunk,
    ],
    preloadedState: load({states: ['settings']}),
})