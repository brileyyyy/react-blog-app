import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getPopularTags = createAsyncThunk(
    'tags/getPopular', async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/api/tags', {
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