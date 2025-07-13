import { configureStore } from '@reduxjs/toolkit';
import reducerA from './reducers/reducerA';
import reducerB from './reducers/reducerB';

const store = configureStore({
  reducer: {
    reducerA,
    reducerB,
  },
});

export default store;
