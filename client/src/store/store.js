import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
import commentReducer from "./reducers/commentReducer";

export const store = configureStore({
    reducer: {
        post: postReducer,
        user: userReducer,
        comment: commentReducer
    }
})