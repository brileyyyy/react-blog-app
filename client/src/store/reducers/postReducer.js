import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
    'post/create', async (data, {rejectWithValue}) => {
        try {
            const {title, description, tags} = data
            const response = await axios.post('http://localhost:5000/api/posts', {
                title, description, tags
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return response.data
        } catch (e) {
            rejectWithValue(e.response.data.message)
        }
    }
)

export const getAllPosts = createAsyncThunk(
    'post/getAll', async (_, {rejectWithValue}) => {
        try {
            return (await axios.get('http://localhost:5000/api/posts')).data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const deletePost = createAsyncThunk(
    'post/delete', async (post, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
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
    posts: [],
    isLoading: false
}

const postReducer = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.posts.push(action.payload)
            })
            .addCase(createPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.posts = action.payload
            })
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post._id !== action.payload._id)
            })
    }
})

export default postReducer.reducer