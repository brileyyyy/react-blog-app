import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {DEFAULT_IMAGE_URL} from "../../config/url";

export const uploadPostImage = createAsyncThunk(
    'upload/image', async (data, {rejectWithValue}) => {
        try {
            return (await axios.post('http://localhost:5000/api/upload/post', data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
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
    'upload/deleteAvatar', async (data, {rejectWithValue}) => {
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
    'upload/deleteBgAvatar', async (filePath, {rejectWithValue}) => {
        try {
            await axios.delete(`http://localhost:5000/api/upload/image`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    filePath
                }
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const deleteUserAvatarBgImage = createAsyncThunk(
    'upload/delete', async (filePath, {rejectWithValue}) => {
        try {
            await axios.delete(`http://localhost:5000/api/upload/bg_image`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    filePath
                }
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

const initialState = {
    postImageUrl: '',
    userAvatarImageUrl: '',
    userBgAvatarImageUrl: ''
}

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setPostImageToDefault(state) {
            state.postImageUrl = ''
        }
    },
    extraReducers: builder =>
        builder
            .addCase(uploadPostImage.fulfilled, (state, action) => {
                state.postImageUrl = action.payload
            })
            .addCase(uploadUserAvatarImage.fulfilled, (state, action) => {
                state.userAvatarImageUrl = action.payload
            })
            .addCase(uploadUserAvatarBgImage.fulfilled, (state, action) => {
                state.userBgAvatarImageUrl = action.payload
            })
            .addCase(deleteUserAvatarImage.fulfilled, (state) => {
                state.userAvatarImageUrl = DEFAULT_IMAGE_URL
            })
            .addCase(deleteUserAvatarBgImage.fulfilled, (state) => {
                state.userBgAvatarImageUrl = DEFAULT_IMAGE_URL
            })
})

export default uploadSlice.reducer
export const {setPostImageToDefault} = uploadSlice.actions