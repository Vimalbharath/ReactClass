import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const URL = 'https://api.github.com/users/vimalbharath';

// 1. Create the asynchronous thunk action middleware
export const fetchUser1 = createAsyncThunk(
    'user/fetchGithubProfile', // Action type prefix string
    async () => {
        const response = await axios.get(URL);
        return response.data; // This data becomes the action.payload when fulfilled
    }
);

const userSlice = createSlice({
    name: 'userFeature',
    initialState: {
        profile: {},       // Holds your github data array/object
        loading: false,    // Tracks loading spinner status
        error: null        // Tracks failure error text
    },
    reducers: { 
        // Plain synchronous actions would go here if needed
    },
    extraReducers: (builder) => {
        builder
            // Stage 1: API request started
            .addCase(fetchUser1.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Stage 2: API request succeeded
            .addCase(fetchUser1.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload; // Store the github profile data safely via Immer
            })
            // Stage 3: API request failed
            .addCase(fetchUser1.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    }
});

export default userSlice.reducer;