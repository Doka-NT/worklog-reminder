import { configureStore } from "@reduxjs/toolkit";
import { load, save } from "redux-localstorage-simple";
import thunk from "redux-thunk";
import { appReducer } from "../Store/appSlice";
import { issueListReducer } from "../Screen/IssuesScreen/slice";
import { welcomeScreenReducer } from "../Screen/WelcomeScreen/slice";
import { settingsReducer } from "./settingsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    welcomeScreen: welcomeScreenReducer,
    issueList: issueListReducer,
  },
  middleware: [
    save({ states: ['settings'] }),
    thunk,
  ],
  preloadedState: load({ states: ['settings'] }),
})