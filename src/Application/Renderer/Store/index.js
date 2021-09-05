import { configureStore } from '@reduxjs/toolkit';
import { load, save } from 'redux-localstorage-simple';
import thunk from 'redux-thunk';
import { appReducer } from './appSlice';
import { issueListReducer } from '../Screen/IssuesScreen/slice';
import { welcomeScreenReducer } from '../Screen/WelcomeScreen/slice';
import { settingsReducer } from './settingsSlice';
import { timeDialogReducer } from '../Screen/IssuesScreen/Components/TimeDialog/slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    welcomeScreen: welcomeScreenReducer,
    issueList: issueListReducer,
    timeDialog: timeDialogReducer,
  },
  middleware: [
    save({ states: ['settings'] }),
    thunk,
  ],
  preloadedState: load({ states: ['settings'] }),
});

export default {
  store,
};
