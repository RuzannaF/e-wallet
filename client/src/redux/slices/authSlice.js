import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import axios from 'axios';

export const registration = createAsyncThunk(
  'auth/registrateUser',
  async ({ email, password }) => {
    return await authApi.registration({ email, password });
  }
)

export const login = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    return await authApi.login({ email, password });
  }
)

export const logout = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    return await authApi.logout();
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuthUser',
  async () => {
    return await authApi.checkAuth();
  }
)

const initialState = {
  user: null,
  isAuth: false,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken)
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(registration.pending, (state) => {
        state.loading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken)
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false; // Устанавливаем флаг авторизации в false
        state.user = null; // Сбрасываем пользователя
        console.error('Ошибка при регистрации:', action.error.message); // Выводим ошибку в консоль
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem('token');
        state.loading = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken);
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      });
  },
});

export default authSlice.reducer;