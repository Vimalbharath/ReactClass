import {configureStore} from '@reduxjs/toolkit'
import myReducer from './reducers'

const store= configureStore( {
    reducer: {
    counter: myReducer,
  }
});

export default store;