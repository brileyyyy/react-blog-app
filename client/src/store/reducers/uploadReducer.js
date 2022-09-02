import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

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
    'upload/bgAvatar', async (data, {rejectWithValue}) => {
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

const initialState = {
    postImageUrl: '',
    userAvatarImageUrl: '',
    bgAvatarImageUrl: ''
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
                state.bgAvatarImageUrl = action.payload
            })
})

export default uploadSlice.reducer
export const {setPostImageToDefault} = uploadSlice.actions