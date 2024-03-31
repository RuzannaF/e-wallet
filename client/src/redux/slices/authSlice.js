import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';

export const registration = createAsyncThunk(
  'auth/registrateUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await authApi.registration({ email, password })
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const login = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await authApi.login({ email, password })
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
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
  user: {
    id: null,
    isActivated: false,
  },
  isAuth: false,
  loading: false,
  error: {
    login: null,
    registration: null,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = {
        login: null,
        registration: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = {
          login: null,
          registration: null,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken)
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = {
          login: null,
          registration: null,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.user = {
          id: null,
          isActivated: false,
        };
        state.error.login = action.payload;
      })
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = {
          login: null,
          registration: null,
        };
      })
      .addCase(registration.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken)
        state.loading = false;
        state.user = action.payload.user;
        state.error = {
          login: null,
          registration: null,
        };
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.user = {
          id: null,
          isActivated: false,
        };
        state.error.registration = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem('token');
        state.loading = false;
        state.isAuth = false;
        state.user = {
          id: null,
          isActivated: false,
        };
        state.error = {
          login: null,
          registration: null,
        };
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken);
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = {
          login: null,
          registration: null,
        };
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.user = {
          id: null,
          isActivated: false,
        };
        state.error = {
          login: null,
          registration: null,
        };
      })
  },
});

export const { clearError } = authSlice.actions

export default authSlice.reducer;