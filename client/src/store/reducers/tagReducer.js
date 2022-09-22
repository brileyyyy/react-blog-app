import {createSlice} from "@reduxjs/toolkit";
import {getPopularTags} from "../actions/tagActions";

const initialState = {
    popularTags: []
}

const tagReducer = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getPopularTags.fulfilled, (state, action) => {
                state.popularTags = action.payload
            })
})

export default tagReducer.reducer