import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
    'post/getAll', async (_, {rejectWithValue}) => {
        try {
            return (await axios.get('http://localhost:5000/api/posts')).data
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
    'upload/image', async (data, {rejectWithValue}) => {
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

const initialState = {
    posts: [],
    userPosts: [],
    userPostsCount: 0,
    currentPost: {},
    postImageUrl: '',
    isLoading: false
}

const postReducer = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPostImageToDefault(state) {
            state.postImageUrl = ''
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.posts.unshift(action.payload)
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
            .addCase(getAllUserPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.userPosts = action.payload.posts
                state.userPostsCount = action.payload.postsCount
            })
            .addCase(getAllUserPosts.pending, (state) => {
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
            .addCase(uploadPostImage.fulfilled, (state, action) => {
                state.postImageUrl = action.payload
            })
    }
})

export default postReducer.reducer
export const {setPostImageToDefault} = postReducer.actions