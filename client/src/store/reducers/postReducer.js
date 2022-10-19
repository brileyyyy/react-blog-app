import {createSlice} from "@reduxjs/toolkit";
import {
    createPost,
    deletePost,
    getAllPosts,
    getAllUserPosts,
    getOnePost,
    getOnePostByComment, getPopularPosts, updateOnePost, uploadPostImage
} from "../actions/postActions";

const initialState = {
    posts: [],
    postSortValue: {sortType: 'all'},
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
        },
        setPostSortValue(state, action) {
            state.postSortValue = action.payload
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
            .addCase(getPopularPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.posts = action.payload
            })
            .addCase(getPopularPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOnePost.fulfilled, (state, action) => {
                state.currentPost = action.payload
            })
            .addCase(getOnePostByComment.fulfilled, (state, action) => {
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
export const {setPostImageToDefault, setPostSortValue} = postReducer.actions