import { configureStore } from '@reduxjs/toolkit';
import {thunk }from 'redux-thunk'; // Import thunk middleware
import rootReducer from '../store/slices/index'; // Import your root reducer

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
