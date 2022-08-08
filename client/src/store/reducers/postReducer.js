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

export const getOnePost = createAsyncThunk(
    'post/getOne', async (data, {rejectWithValue}) => {
        try {
            const {post, navigate, edit} = data
            const response = await axios.get(`http://localhost:5000/api/posts/${post._id}`)
            edit ? navigate(`/posts/${post._id}/edit`) : navigate(`/posts/${post._id}`)

            return response.data
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

export const updateOnePost = createAsyncThunk(
    'post/updateOne', async (data, {rejectWithValue}) => {
        try {
            const {post, title, description, tags} = data
            const response = await axios.patch(`http://localhost:5000/api/posts/${post._id}`, {
                title, description, tags
            }, {
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
    currentPost: {},
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
            .addCase(getOnePost.fulfilled, (state, action) => {
                state.currentPost = action.payload
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post._id !== action.payload._id)
            })
            .addCase(updateOnePost.fulfilled, (state, action) => {
                state.isLoading = false
                const post = state.posts.find(f => f._id === action.payload._id)
                post.title = action.payload.title
            })
            .addCase(updateOnePost.pending, (state) => {
                state.isLoading = true
            })
    }
})

export default postReducer.reducer