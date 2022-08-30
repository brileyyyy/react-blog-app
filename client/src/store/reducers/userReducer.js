import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const registration = createAsyncThunk(
    'user/registration', async (data, {rejectWithValue}) => {
        const {dispatch, navigate, email, password, name} = data
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                email, password, name
            })
            dispatch(resetErrors())
            navigate('/login')

            return response.data
        } catch (e) {
            dispatch(resetErrors())
            return rejectWithValue(e.response.data)
        }
    }
)

export const login = createAsyncThunk(
    'user/login', async (data, {rejectWithValue}) => {
        const {dispatch, email, password} = data
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email, password
            })
            dispatch(resetErrors())

            return response.data
        } catch (e) {
            dispatch(resetErrors())
            return rejectWithValue(e.response.data)
        }
    }
)

export const getAuth = createAsyncThunk(
    'user/auth', async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/me', {
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

export const getAllUsers = createAsyncThunk(
    'user/getAll', async (_, {rejectWithValue}) => {
        try {
            return (await axios.get('http://localhost:5000/api/users', {
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
                state.users = action.payload
            })
    }
})

export default userSlice.reducer
export const {logout, resetErrors} = userSlice.actions