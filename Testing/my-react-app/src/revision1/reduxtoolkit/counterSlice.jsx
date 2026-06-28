import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: { 
    // RTK maps these method names to auto-generated action types behind the scenes
    increment: (state) => {
      state.count += 1; // Safe to modify directly due to built-in Immer processing
    },
    decrement: (state) => {
      state.count -= 1;
    }
  },
});

// 1. Export the auto-generated action commands for our UI buttons
export const { increment, decrement } = counterSlice.actions;

// 2. Export the underlying slice engine for the global store registration
export default counterSlice.reducer;