import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {DEFAULT_IMAGE_URL} from "../../config/url";

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

export const uploadUserAvatarImage = createAsyncThunk(
    'upload/avatar', async (data, {rejectWithValue}) => {
        try {
            return (await axios.post('http://localhost:5000/api/upload/image', data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const uploadUserAvatarBgImage = createAsyncThunk(
    'upload/backgroundAvatar', async (data, {rejectWithValue}) => {
        try {
            return (await axios.post('http://localhost:5000/api/upload/bg_image', data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const deleteUserAvatarImage = createAsyncThunk(
    'upload/deleteAvatar', async (filePath, {rejectWithValue}) => {
        try {
            await axios.delete(`http://localhost:5000/api/upload/image`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {filePath}
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const deleteUserAvatarBgImage = createAsyncThunk(
    'upload/deleteBgAvatar', async (filePath, {rejectWithValue}) => {
        try {
            await axios.delete(`http://localhost:5000/api/upload/bg_image`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {filePath}
            })
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
            .addCase(uploadUserAvatarImage.fulfilled, (state, action) => {
                state.selectedUser = action.payload
            })
            .addCase(uploadUserAvatarBgImage.fulfilled, (state, action) => {
                state.selectedUser = action.payload
            })
            .addCase(deleteUserAvatarImage.fulfilled, (state) => {
                state.selectedUser.avatarUrl = DEFAULT_IMAGE_URL
            })
            .addCase(deleteUserAvatarBgImage.fulfilled, (state) => {
                state.selectedUser.backgroundAvatarUrl = DEFAULT_IMAGE_URL
            })
})

export default userProfileSlice.reducer