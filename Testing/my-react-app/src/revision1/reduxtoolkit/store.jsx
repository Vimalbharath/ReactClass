import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // Import the clean slice reducer from above

const store = configureStore({
  reducer: {
    // This namespacing makes our data accessible via: state.counter.count
    counter: counterReducer, 
  }
});

export default store;