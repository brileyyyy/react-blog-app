import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {resetErrors} from "../reducers/userReducer";

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

export const uploadUserAvatarImage = createAsyncThunk(
    'upload/avatar', async (data, {rejectWithValue}) => {
        try {
            return (await axios.post('http://localhost:5000/api/upload/image', data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const uploadUserAvatarBgImage = createAsyncThunk(
    'upload/backgroundAvatar', async (data, {rejectWithValue}) => {
        try {
            return (await axios.post('http://localhost:5000/api/upload/bg_image', data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })).data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const deleteUserAvatarImage = createAsyncThunk(
    'upload/deleteAvatar', async (filePath, {rejectWithValue}) => {
        try {
            await axios.delete(`http://localhost:5000/api/upload/image`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {filePath}
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const deleteUserAvatarBgImage = createAsyncThunk(
    'upload/deleteBgAvatar', async (filePath, {rejectWithValue}) => {
        try {
            await axios.delete(`http://localhost:5000/api/upload/bg_image`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {filePath}
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)