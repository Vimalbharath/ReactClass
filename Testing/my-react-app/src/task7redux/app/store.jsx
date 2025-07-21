// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import insuranceReducer from '../features/insurance/insuranceSlice';

const store = configureStore({
  reducer: {
    insurance: insuranceReducer,
  },
});

export default store;
