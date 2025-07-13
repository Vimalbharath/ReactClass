// src/features/insurance/insuranceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base URL
const API_URL = 'http://localhost:3006/insurances';

// Fetch all insurances
export const fetchInsurances = createAsyncThunk('insurance/fetchInsurances', async () => {
  const res = await fetch(API_URL);
  return await res.json();
});

// Add new insurance
export const addInsurance = createAsyncThunk('insurance/addInsurance', async (newPolicy) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPolicy),
  });
  return await res.json();
});

const insuranceSlice = createSlice({
  name: 'insurance',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchInsurances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInsurances.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInsurances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addInsurance.fulfilled, (state, action) => {
        state.list.push(action.payload); // add new policy to list
      });
  },
});

export default insuranceSlice.reducer;
