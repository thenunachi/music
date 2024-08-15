// src/store/slices/index.js
import { combineReducers } from '@reduxjs/toolkit';

import songReducer from '../songReducer';

const rootReducer = combineReducers({

  songReducer: songReducer,
  // Add more reducers here if you have other slices
});

export default rootReducer;
