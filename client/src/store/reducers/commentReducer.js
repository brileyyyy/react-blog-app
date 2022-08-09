import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk(
    'comment/add', async (data, {rejectWithValue}) => {
        try {
            const {avatar, text} = data
            const response = await axios.post('http://localhost:5000/api/comment', {
                avatar, date: Date.now(), text
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

const initialState = {
    comments: [],
    currentComment: {}
}

const commentSlice = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload)
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.comments = action.payload
            })
})

export default commentSlice.reducer