import { configureStore } from "@reduxjs/toolkit";
import { welcomeScreenReducer } from "../Screen/WelcomeScreen/slice";

export const store = configureStore({
    reducer: {
        welcomeScreen: welcomeScreenReducer
    },
});
