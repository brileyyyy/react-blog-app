import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getUserProfile = createAsyncThunk(
    'user/getOne', async (data, {rejectWithValue}) => {
        try {
            const {user, navigate} = data
            const response = await axios.get(`http://localhost:5000/api/user_profile/${user._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            navigate(`/users/${user._id}`)

            return response.data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

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