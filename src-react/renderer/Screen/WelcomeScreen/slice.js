import { createSlice } from "@reduxjs/toolkit";

const welcomeScreenSlice = createSlice({
    name: 'welcomeScreen',
    initialState: {
        index: 0,
    },
    reducers: {
        setSlide: (state, action) => {
            state.index = action.payload
        },
        showNext: state => {
            state.index++
        },
        showPrev: state => {
            state.index--
        }
    },
})

const welcomeScreenReducer = welcomeScreenSlice.reducer

const selectIndex = (state) => state.welcomeScreen.index

const {setSlide, showNext, showPrev} = welcomeScreenSlice.actions

export {
    welcomeScreenReducer,
    welcomeScreenSlice,
    selectIndex,
    setSlide,
    showNext,
    showPrev,
}