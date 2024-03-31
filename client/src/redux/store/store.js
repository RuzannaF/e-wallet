import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/AuthSlice';
import balanceReducer from '../slices/BalanceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
  },
});