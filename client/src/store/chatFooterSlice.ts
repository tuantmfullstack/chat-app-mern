import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatFooterStateI, MessageI, MessageClient } from './type';
import instance from '../utils/axiosConfig';
import handleThunk from '../utils/HandleThunk';
import chatBodySlice from './chatBodySlice';

const initialState: ChatFooterStateI = {
  isLoading: false,
  message: null,
  err: false,
};

export const createMessage = createAsyncThunk(
  'createMessage',
  (message: MessageClient, { rejectWithValue, dispatch }) => {
    const fn = instance.post('messages', message);
    const data = handleThunk(fn, rejectWithValue);

    data.then((data) => {
      dispatch(chatBodySlice.actions.addingMessage(data.message));
    });

    return data;
  }
);

const chatFooterSlice = createSlice({
  name: 'chatFooterSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [createMessage.pending.type]: (state, { payload }) => {
      state.isLoading = true;
      state.err = false;
    },
    [createMessage.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.err = false;
    },
    [createMessage.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.err = true;
    },
  },
});

export default chatFooterSlice;
