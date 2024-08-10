// src/store/slices/index.js
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlices';

const rootReducer = combineReducers({
  counter: counterReducer,
  // Add more reducers here if you have other slices
});

export default rootReducer;
