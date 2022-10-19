import {createSlice} from "@reduxjs/toolkit";
import {
    addComment,
    deleteComment,
    getAllComments,
    getAllUserComments,
    getPostComments, updateComment
} from "../actions/commentActions";

const initialState = {
    comments: [],
    postComments: [],
    userComments: [],
    userCommentsCount: 0,
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
            .addCase(getAllUserComments.fulfilled, (state, action) => {
                state.userComments = action.payload.comments
                state.userCommentsCount = action.payload.commentsCount
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.postComments =
                    state.postComments.filter(post => post._id !== action.payload._id)
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const comment =
                    state.postComments.find(comment => comment._id === action.payload._id)
                comment.text = action.payload.text
            })
})

export default commentSlice.reducer