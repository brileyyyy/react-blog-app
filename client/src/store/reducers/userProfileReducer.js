import {createSlice} from "@reduxjs/toolkit"
import {getUserProfile} from "../actions/userProfileActions";

const initialState = {
    selectedUser: {},
}

const userProfileSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.selectedUser = action.payload
            })
})

export default userProfileSlice.reducer