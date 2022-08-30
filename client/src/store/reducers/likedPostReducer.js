import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const createLikedPost = createAsyncThunk(
    'likedPost/create', async (post, {rejectWithValue}) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/liked_posts/${post._id}`,
                {}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return response.data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const getLikedPosts = createAsyncThunk(
    'likedPost/getAll', async (_, {rejectWithValue}) => {
        try {
            return (await axios.get('http://localhost:5000/api/liked_posts', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const deleteLikedPost = createAsyncThunk(
    'likedPost/delete', async (post, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/liked_posts/${post._id}`,
                {}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return response.data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

const initialState = {
    likedPosts: [],
    isLoading: false
}

const likedPostSlice = createSlice({
    name: 'likedPost',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(createLikedPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.likedPosts.push(action.payload)
            })
            .addCase(getLikedPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.likedPosts = action.payload
            })
            .addCase(getLikedPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteLikedPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.likedPosts
                    = state.likedPosts.filter(post => post._id !== action.payload._id)
            })
})

export default likedPostSlice.reducer