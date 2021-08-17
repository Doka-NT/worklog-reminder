import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "../appSlice";
import { welcomeScreenReducer } from "../Screen/WelcomeScreen/slice";

import { save, load } from "redux-localstorage-simple";
import { settingsReducer } from "./settingsSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        settings: settingsReducer,
        welcomeScreen: welcomeScreenReducer,
    },
    middleware: [
        save({states: ['settings']}),
    ],
    preloadedState: load({states: ['settings']}),
})