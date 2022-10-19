import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk(
    'comment/add', async (data, {rejectWithValue}) => {
        try {
            const {author, currentPost, avatar, text} = data
            const response = await axios.post('http://localhost:5000/api/comment', {
                author, postId: currentPost._id, avatar, text
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

export const getAllUserComments = createAsyncThunk(
    'comment/getAllUser', async (user, {rejectWithValue}) => {
        try {
            return (await axios.get(`http://localhost:5000/api/comment/user/${user._id}`, {
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

export const updateComment = createAsyncThunk(
    'comment/update', async (data, {rejectWithValue}) => {
        try {
            const {comment, newText} = data

            const response
                = await axios.patch(`http://localhost:5000/api/comment/${comment._id}`, {
                newText
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return response.data
        } catch (e) {
            return rejectWithValue(e.data.response.message)
        }
    }
)