import { createSlice } from '@reduxjs/toolkit';

const welcomeScreenSlice = createSlice({
  name: 'welcomeScreen',
  initialState: {
    index: 0,
    visibleSlideIndex: 0,
    progress: 0,
  },
  reducers: {
    setSlide: (state, action) => {
      state.index = action.payload;
    },
    showNext: (state) => {
      state.index++;
    },
    showPrev: (state) => {
      state.index--;
    },
    slideBecomeVisible: (state, action) => {
      state.visibleSlideIndex = action.payload;
    },
    resetWelcomeScreen: (state) => {
      state.index = 0;
      state.visibleSlideIndex = 0;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

const welcomeScreenReducer = welcomeScreenSlice.reducer;

const selectIndex = (state) => state.welcomeScreen.index;
const selectVisibleSlide = (state) => state.welcomeScreen.visibleSlideIndex;
const selectProgress = (state) => state.welcomeScreen.progress;

const {
  setSlide,
  showNext,
  showPrev,
  slideBecomeVisible,
  resetWelcomeScreen,
  setProgress,
} = welcomeScreenSlice.actions;

export {
  welcomeScreenReducer,
  welcomeScreenSlice,
  selectIndex,
  selectVisibleSlide,
  selectProgress,
  setSlide,
  showNext,
  showPrev,
  resetWelcomeScreen,
  slideBecomeVisible,
  setProgress,
};
