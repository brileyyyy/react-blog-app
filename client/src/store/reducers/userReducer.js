import {createSlice} from "@reduxjs/toolkit";
import {DEFAULT_IMAGE_URL} from "../../config/url";
import {
    deleteUserAvatarBgImage,
    deleteUserAvatarImage,
    getAllUsers,
    getAuth,
    login,
    registration,
    uploadUserAvatarBgImage,
    uploadUserAvatarImage
} from "../actions/userActions";

const initialState = {
    currentUser: {},
    users: [],
    isAuth: false,
    nameError: null,
    emailError: null,
    passwordError: null,
    compareError: null,
    isLoading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.currentUser = {}
            state.isAuth = false
            localStorage.removeItem('token')
        },
        resetErrors(state) {
            state.nameError = null
            state.emailError = null
            state.passwordError = null
            state.compareError = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registration.rejected, (state, action) => {
                if (action.payload.message) state.compareError = action.payload.message
                else {
                    action.payload.forEach(err => {
                        (err.param === 'name') && (state.nameError = err.msg);
                        (err.param === 'email') && (state.emailError = err.msg);
                        (err.param === 'password') && (state.passwordError = err.msg);
                    })
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser = action.payload.user
                state.isAuth = true
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(login.rejected, (state, action) => {
                if (action.payload.message) state.compareError = action.payload.message
                else {
                    action.payload.forEach(err => {
                        (err.param === 'email') && (state.emailError = err.msg);
                        (err.param === 'password') && (state.passwordError = err.msg);
                    })
                }
            })
            .addCase(getAuth.fulfilled, (state, action) => {
                state.currentUser = action.payload.user
                state.isAuth = true
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(getAuth.rejected, (state) => {
                state.isLoading = false
                localStorage.removeItem('token')
            })
            .addCase(getAuth.pending, (state) => {
                state.isLoading = false
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = action.payload
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadUserAvatarImage.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(uploadUserAvatarBgImage.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(deleteUserAvatarImage.fulfilled, (state) => {
                state.currentUser.avatarUrl = DEFAULT_IMAGE_URL
            })
            .addCase(deleteUserAvatarBgImage.fulfilled, (state) => {
                state.currentUser.backgroundAvatarUrl = DEFAULT_IMAGE_URL
            })
    }
})

export default userSlice.reducer
export const {logout, resetErrors} = userSlice.actions