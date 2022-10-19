import {createSlice} from "@reduxjs/toolkit";
import {createLikedPost, deleteLikedPost, getLikedPosts} from "../actions/likedPostActions";

const initialState = {
    likedPosts: [],
    isLoading: false
}

const likedPostSlice = createSlice({
    name: 'likedPost',
    initialState,
    reducers: {},
    extraReducers: builder => {
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
            });
    }
})

export default likedPostSlice.reducer