import { createSlice } from '@reduxjs/toolkit';

const timeDialogSlice = createSlice({
  name: 'timeDialog',
  initialState: {
    hours: null,
    minutes: null,
  },
  reducers: {
    setMinutes: (state, action) => {
      state.minutes = action.payload;
    },
    setHours: (state, action) => {
      state.hours = action.payload;
    },
    resetTime: (state) => {
      state.hours = null;
      state.minutes = null;
    },
  },
});

const timeDialogReducer = timeDialogSlice.reducer;

const selectHours = (state) => state.timeDialog.hours;
const selectMinutes = (state) => state.timeDialog.minutes;

const {
  setHours,
  setMinutes,
  resetTime,
} = timeDialogSlice.actions;

export {
  timeDialogSlice,
  timeDialogReducer,

  // Selectors
  selectHours,
  selectMinutes,

  // Reducers
  setHours,
  setMinutes,
  resetTime,
};
