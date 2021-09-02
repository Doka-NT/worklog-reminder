import { createSlice } from '@reduxjs/toolkit';
import AbstractStorage from '../../../Domain/AbstractStorage';
import NotificationTask from '../../Task/Renderer/NotificationTask';
import ReloadIssuesTask from '../../Task/Renderer/ReloadIssuesTask';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    host: '',
    username: '',
    token: '',
    notificationInterval: AbstractStorage.DEFAULT_NOTIFICATION_INTERVAL,
    updateInterval: AbstractStorage.DEFAULT_UPDATE_INTERVAL,
    isOnboardingPassed: false,
  },
  reducers: {
    setHost: (state, action) => { state.host = action.payload; },
    setUsername: (state, action) => { state.username = action.payload; },
    setToken: (state, action) => { state.token = action.payload; },
    setNotificationInterval: (state, action) => {
      state.notificationInterval = action.payload;
      new NotificationTask().restart(state.notificationInterval);
    },
    setUpdateInterval: (state, action) => {
      state.updateInterval = action.payload;
      new ReloadIssuesTask().restart(state.updateInterval);
    },
    setOnboardingPassed: (state, action) => {
      state.isOnboardingPassed = action.payload;
    },
  },
});

const selectSettings = (state) => state.settings;
const selectHost = (state) => state.settings.host;
const selectUsername = (state) => state.settings.username;
const selectToken = (state) => state.settings.token;
const selectNotificationInterval = (state) => state.settings.notificationInterval;
const selectUpdateInterval = (state) => state.settings.updateInterval;
const selectIsOnboardingPassed = (state) => state.settings.isOnboardingPassed;

const selectIsSettingsFilled = (state) => {
  const {
    host,
    username,
    token,
    updateInterval,
    notificationInterval,
  } = state.settings;

  return host && username && token && updateInterval && notificationInterval;
};

const {
  setHost,
  setUsername,
  setToken,
  setNotificationInterval,
  setUpdateInterval,
  setOnboardingPassed,
} = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;

export {
  settingsReducer,
  settingsSlice,
  // Selectors
  selectSettings,
  selectHost,
  selectUsername,
  selectToken,
  selectNotificationInterval,
  selectUpdateInterval,
  selectIsSettingsFilled,
  selectIsOnboardingPassed,
  // Reducers
  setHost,
  setUsername,
  setToken,
  setNotificationInterval,
  setUpdateInterval,
  setOnboardingPassed,
};
