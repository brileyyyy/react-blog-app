import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
    'post/create', async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:5000/api/posts', data, {
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
    'post/getAll', async (data, {rejectWithValue}) => {
        try {
            const {sortType, sortValue} = data
            let url = 'http://localhost:5000/api/posts'

            if (sortType && sortValue) {
                url = `http://localhost:5000/api/posts?sortType=${sortType}&sortValue=${encodeURIComponent(sortValue)}`
            } else if (sortType) {
                url = `http://localhost:5000/api/posts?sortType=${sortType}`
            } else if (sortValue) {
                url = `http://localhost:5000/api/posts?sortValue=${encodeURIComponent(sortValue)}`
            }

            const response = await axios.get(url)

            return response.data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const getAllUserPosts = createAsyncThunk(
    'post/getAllUser', async (user, {rejectWithValue}) => {
        try {
            return (await axios.get(`http://localhost:5000/api/posts/user/${user._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const getPopularPosts = createAsyncThunk(
    'post/popular', async (_, {rejectWithValue}) => {
        try {
            return (await axios.get('http://localhost:5000/api/posts-popular', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
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

export const getOnePostByComment = createAsyncThunk(
    'post/getOneByComment', async (data, {rejectWithValue}) => {
        try {
            const {comment, navigate, edit} = data
            const response = await axios.get(`http://localhost:5000/api/posts/comment/${comment._id}`)

            const post = response.data
            edit ? navigate(`/posts/${post._id}/edit`) : navigate(`/posts/${post._id}`)

            return post
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
            const {post, title, description, tags, imageUrl} = data
            const response = await axios.patch(`http://localhost:5000/api/posts/${post._id}`, {
                title, description, tags, imageUrl
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

export const uploadPostImage = createAsyncThunk(
    'post/UploadImage', async (data, {rejectWithValue}) => {
        try {
            return (await axios.post('http://localhost:5000/api/posts/upload', data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)
