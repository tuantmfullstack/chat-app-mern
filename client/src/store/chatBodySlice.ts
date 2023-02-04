import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatBodyStateI } from './type';
import instance from '../utils/axiosConfig';
import handleThunk from '../utils/HandleThunk';

const initialState: ChatBodyStateI = {
  isLoading: false,
  messages: [],
  err: false,
};

export const getMessagesThunk = createAsyncThunk(
  'getMessagesThunk',
  (conversationId: string, { rejectWithValue }) => {
    const fn = instance.get(`messages/${conversationId}`);
    return handleThunk(fn, rejectWithValue);
  }
);

const chatBodySlice = createSlice({
  name: 'chatBodySlice',
  initialState,
  reducers: {
    addingMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: {
    [getMessagesThunk.pending.type]: (state, { payload }) => {
      state.isLoading = true;
      state.err = false;
    },
    [getMessagesThunk.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.err = false;
      state.messages = payload.messages;
    },
    [getMessagesThunk.rejected.type]: (state, { payload }) => {
      state.isLoading = true;
      state.messages = [];
      state.err = true;
    },
  },
});

export default chatBodySlice;
