import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatBodyStateI } from './type';
import instance from '../utils/axiosConfig';
import handleThunk from '../utils/HandleThunk';

interface DataI {
  conversationId: string;
  skip: number;
}

const initialState: ChatBodyStateI = {
  isLoading: false,
  isContinue: true,
  messages: [],
  err: false,
};

export const getMessagesThunk = createAsyncThunk(
  'getMessagesThunk',
  ({ conversationId, skip }: DataI, { rejectWithValue }) => {
    const fn = instance.get(`messages/${conversationId}?skip=${skip}&limit=10`);
    return handleThunk(fn, rejectWithValue);
  }
);

const chatBodySlice = createSlice({
  name: 'chatBodySlice',
  initialState,
  reducers: {
    addingMessage: (state, { payload }) => {
      state.messages[0].data = [payload, ...state.messages[0].data];
    },
    resetMessages: (state) => {
      state.isLoading = false;
      state.messages = [];
      state.isContinue = true;
      state.err = false;
    },
  },
  extraReducers: {
    [getMessagesThunk.pending.type]: (state, { payload }) => {
      state.isLoading = true;
      state.err = false;
    },
    [getMessagesThunk.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.isContinue = payload.isContinue;
      state.err = false;
      state.messages.push({ id: Math.random(), data: payload.messages });
    },
    [getMessagesThunk.rejected.type]: (state, { payload }) => {
      state.isLoading = true;
      state.isContinue = false;
      state.err = true;
    },
  },
});

export default chatBodySlice;
