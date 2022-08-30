import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
import commentReducer from "./reducers/commentReducer";
import likedPostReducer from "./reducers/likedPostReducer";

export const store = configureStore({
    reducer: {
        post: postReducer,
        likedPost: likedPostReducer,
        user: userReducer,
        comment: commentReducer
    }
})