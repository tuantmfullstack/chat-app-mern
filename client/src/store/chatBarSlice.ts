import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../utils/axiosConfig';
import handleThunk from '../utils/HandleThunk';
import { ChatBarStateI } from './type';

const initialState: ChatBarStateI = {
  isLoading: false,
  conversations: [],
  conversation: null,
  err: false,
};

export const getAllConversationsThunk = createAsyncThunk(
  'getAllConversationsThunk',
  (_, { rejectWithValue }) => {
    const fn = instance.get('conversations');
    return handleThunk(fn, rejectWithValue);
  }
);

const chatBarSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeConversation: (state, { payload }) => {
      state.conversation = payload;
    },
  },
  extraReducers: {
    [getAllConversationsThunk.pending.type]: (state, { payload }) => {
      state.isLoading = true;
      state.err = false;
    },
    [getAllConversationsThunk.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.err = false;
      state.conversations = payload.conversations;
    },
    [getAllConversationsThunk.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
  },
});

export default chatBarSlice;
