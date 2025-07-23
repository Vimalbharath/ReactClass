import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/bookReducer';

const store = configureStore({
  reducer: {
    qwerty: bookReducer,
  },
});

export default store;