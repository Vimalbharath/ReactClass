import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const API_URL = 'http://localhost:3006/books3';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const res = await axios.get(API_URL);
  return  res.data;
});

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // // Add
      // .addCase(addInsurance.fulfilled, (state, action) => {
      //   state.list.push(action.payload); // add new policy to list
      // });
  },
});

export default bookSlice.reducer;