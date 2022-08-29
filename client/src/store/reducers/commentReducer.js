import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk(
    'comment/add', async (data, {rejectWithValue}) => {
        try {
            const {currentPost, avatar, text} = data
            const response = await axios.post('http://localhost:5000/api/comment', {
                postId: currentPost._id, avatar, date: Date.now(), text
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

export const getPostComments = createAsyncThunk(
    'comment/getPostComments', async (post, {rejectWithValue}) => {
        try {
            return (await axios.get(`http://localhost:5000/api/comment/${post._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const getAllComments = createAsyncThunk(
    'comment/getAll', async (_, {rejectWithValue}) => {
        try {
            return (await axios.get('http://localhost:5000/api/comment', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const deleteComment = createAsyncThunk(
    'comment/delete', async (comment, {rejectWithValue}) => {
        try {
            return (await axios.delete(`http://localhost:5000/api/comment/${comment._id}`, {
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
    comments: [],
    postComments: [],
    currentComment: {}
}

const commentSlice = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(addComment.fulfilled, (state, action) => {
                state.postComments.push(action.payload)
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.postComments = action.payload
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.comments = action.payload
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.postComments =
                    state.postComments.filter(post => post._id !== action.payload._id)
            })
})

export default commentSlice.reducer