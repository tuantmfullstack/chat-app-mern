import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authThunk from '../utils/AuthThunk';
import instance from '../utils/axiosConfig';
import { authState, AuthUserI, UserI } from './type';

const token = localStorage.getItem('token');

const initialState: authState = {
  name: localStorage.getItem('name'),
  id: localStorage.getItem('id'),
  isLogin: !!token,
  user: null,
};

interface Data {
  id?: string;
  user?: AuthUserI;
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  token?: string;
  currentPassword?: string;
  avatar?: string;
  navigate?: Function;
}

export const signupThunk = createAsyncThunk(
  'signupThunk',
  ({ user, navigate }: Data, { rejectWithValue, dispatch }) => {
    const fn = instance.post('auth/signup', user);

    return authThunk({ fn, rejectWithValue, navigate, dispatch });
  }
);

export const loginThunk = createAsyncThunk(
  'loginThunk',
  ({ user, navigate }: Data, { rejectWithValue, dispatch }) => {
    const fn = instance.post('auth/login', user);
    return authThunk({ fn, rejectWithValue, navigate, dispatch });
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'forgotPasswordThunk',
  ({ email, navigate }: Data, { rejectWithValue }) => {
    const fn = instance.post('auth/forgotPassword', { email });
    return authThunk({ fn, rejectWithValue, navigate });
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'resetPasswordThunk',
  (
    { password, passwordConfirm, token, navigate }: Data,
    { rejectWithValue, dispatch }
  ) => {
    const fn = instance.patch(`auth/resetPassword/${token}`, {
      password,
      passwordConfirm,
    });
    return authThunk({ fn, rejectWithValue, navigate, dispatch });
  }
);

export const updatePasswordThunk = createAsyncThunk(
  'updatePasswordThunk',
  (
    { currentPassword, password, passwordConfirm, navigate }: Data,
    { rejectWithValue }
  ) => {
    const fn = instance.post('auth/updatePassword', {
      currentPassword,
      password,
      passwordConfirm,
    });
    return authThunk({ fn, rejectWithValue, navigate });
  }
);

export const updateInfoThunk = createAsyncThunk(
  'updateInfoThunk',
  ({ id, name, email }: Data, { rejectWithValue }) => {
    const fn = instance.patch(`users/${id}`, {
      name,
      email,
    });
    return authThunk({ fn, rejectWithValue });
  }
);

export const updateAvatarThunk = createAsyncThunk(
  'updateAvatarThunk',
  ({ id, avatar }: Data, { rejectWithValue }) => {
    const fn = instance.patch(`users/${id}`, {
      avatar,
    });
    return authThunk({ fn, rejectWithValue });
  }
);

export const getUserInfoThunk = createAsyncThunk(
  'getUserInfoThunk',
  ({ id }: Data, { rejectWithValue }) => {
    const fn = instance.get(`users/${id}`);
    return authThunk({ fn, rejectWithValue });
  }
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authFulfilled: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      localStorage.setItem('id', payload.user._id);
      state.isLogin = true;
      state.id = payload.user._id;
    },
    authRejected: (state, { payload }) => {
      state.isLogin = false;
    },
    logout: (state, { payload }) => {
      localStorage.clear();
      state.isLogin = false;
    },
  },
  extraReducers: {
    [getUserInfoThunk.fulfilled.type]: (state, { payload }) => {
      state.user = payload.user;
    },
    [getUserInfoThunk.rejected.type]: (state, { payload }) => {
      state.user = null;
    },
    [updateInfoThunk.fulfilled.type]: (state, { payload }) => {
      state.user = payload.user;
    },
    [updateInfoThunk.rejected.type]: (state, { payload }) => {
      state.user = null;
    },
    [updateAvatarThunk.fulfilled.type]: (state, { payload }) => {
      state.user = payload.user;
    },
    [updateAvatarThunk.rejected.type]: (state, { payload }) => {
      state.user = null;
    },
  },
});

export default authSlice;
