import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const API_URL = 'http://localhost:3006/books3';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const res = await axios.get(API_URL);
  return  res.data;
});

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const res = await axios.post(API_URL,book);
  return  res.data;
});

export const updateBook = createAsyncThunk('books/updateBook', async (updatedBookData) => {
  const res = await axios.put(`${API_URL}/${updatedBookData.id}`, updatedBookData);
  return  res.data;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (bookid) => {
  console.log("delete book",bookid)
  const res = await axios.delete(`${API_URL}/${bookid}`);
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

     .addCase(addBook.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.list.push(action.payload); // Add the new book to the list
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload || 'Failed to add book';
      })
       // -------------------- Update Book --------------------
      .addCase(updateBook.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // Replace the updated book in the list
        const index = state.list.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload || 'Failed to update book';
      })
       // -------------------- Delete Book --------------------
      .addCase(deleteBook.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // Filter out the deleted book using the ID returned from the thunk
        state.list = state.list.filter(book => book.id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload || 'Failed to delete book';
      });
  },
});

export default bookSlice.reducer;