import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "../appSlice";
import { welcomeScreenReducer } from "../Screen/WelcomeScreen/slice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        welcomeScreen: welcomeScreenReducer,
    },
});
