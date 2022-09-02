import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
import commentReducer from "./reducers/commentReducer";
import likedPostReducer from "./reducers/likedPostReducer";
import popupReducer from "./reducers/popupReducer";
import uploadReducer from "./reducers/uploadReducer";

export const store = configureStore({
    reducer: {
        post: postReducer,
        likedPost: likedPostReducer,
        user: userReducer,
        comment: commentReducer,
        popup: popupReducer,
        upload: uploadReducer
    }
})