import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import balanceReducer from '../slices/balanceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
  },
});