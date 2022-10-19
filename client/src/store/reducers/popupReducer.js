import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    profilePopupDisplay: 'none',
    languagePopupDisplay: 'none'
}

const popupReducerSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setProfilePopupDisplay(state, action) {
            state.profilePopupDisplay = action.payload
        },
        setLanguagePopupDisplay(state, action) {
            state.languagePopupDisplay = action.payload
        }
    }
})

export default popupReducerSlice.reducer
export const {setProfilePopupDisplay, setLanguagePopupDisplay} = popupReducerSlice.actions